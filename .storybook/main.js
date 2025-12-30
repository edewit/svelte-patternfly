// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type { import('@storybook/svelte-vite').StorybookConfig } */
const config = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/svelte-vite',
    options: {
      svelteOptions: {
        compilerOptions: {
          runes: true,
        },
        exclude: [
          /node_modules\/@storybook\/.*/,
        ],
      },
    },
  },

  core: {
    disableTelemetry: true,
  },

  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="https://unpkg.com/@patternfly/patternfly@6/patternfly.css" crossorigin />
    <style>
      #root {
        padding: 3rem;
      }
      .bg-checkerboard {
        background-image: linear-gradient(45deg, #808080 25%, transparent 25%),
          linear-gradient(-45deg, #808080 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #808080 75%),
          linear-gradient(-45deg, transparent 75%, #808080 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      }
    </style>
  `,

  async viteFinal(config) {
    // Resolve svelte-patternfly imports to the local source
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'svelte-patternfly': resolve(__dirname, '../src/index.js'),
    };

    // Exclude Storybook's internal Svelte files from dependency optimization
    // This prevents Vite from trying to pre-transform them, which causes parse errors
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      '@storybook/svelte',
      '@storybook/svelte-vite',
    ];

    // Wrap the import analysis plugin to catch errors for Storybook's internal Svelte files
    const importAnalysisPlugin = config.plugins.find((p) => p && p.name === 'vite:import-analysis');
    if (importAnalysisPlugin && importAnalysisPlugin.transform) {
      const originalTransform = importAnalysisPlugin.transform.bind(importAnalysisPlugin);
      importAnalysisPlugin.transform = function(code, id, options) {
        // Skip import analysis for Storybook's internal Svelte files
        if (id.includes('@storybook/svelte') && id.endsWith('.svelte')) {
          // Return empty module to prevent parse errors
          return { code: 'export {}', map: null };
        }
        try {
          return originalTransform(code, id, options);
        } catch (error) {
          // If it's a parse error for a Storybook Svelte file, ignore it
          if (error.message && error.message.includes('invalid JS syntax') && id.includes('@storybook/svelte')) {
            return { code: 'export {}', map: null };
          }
          throw error;
        }
      };
    }

    // Configure server to handle Storybook's internal files
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = [
      ...(config.server.fs.allow || []),
      resolve(__dirname, '..'),
    ];

    // Add a plugin to handle ?raw imports for .svelte files
    // This needs to run before the Svelte plugin processes the file
    config.plugins = config.plugins || [];
    const svelteRawPlugin = {
      name: 'svelte-raw-loader',
      enforce: 'pre', // Run before other plugins
      load(id) {
        // Handle .svelte?raw imports
        if (id.includes('.svelte') && id.includes('?raw')) {
          const filePath = id.split('?')[0];
          try {
            const content = readFileSync(filePath, 'utf-8');
            return `export default ${JSON.stringify(content)}`;
          } catch (e) {
            console.warn(`Failed to read file: ${filePath}`, e);
            return null;
          }
        }
        return null;
      },
    };
    // Insert before Svelte plugin
    const sveltePluginIndex = config.plugins.findIndex(
      (p) => p && (p.name === 'vite-plugin-svelte' || p.name === '@sveltejs/vite-plugin-svelte')
    );
    if (sveltePluginIndex >= 0) {
      config.plugins.splice(sveltePluginIndex, 0, svelteRawPlugin);
    } else {
      config.plugins.unshift(svelteRawPlugin); // Add at the beginning to ensure it runs first
    }

    return config;
  },
};
export default config;

