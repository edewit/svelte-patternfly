import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { copyFileSync, existsSync } from 'fs';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    svelte(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.svelte'],
      exclude: ['src/**/*.test.ts', 'src/**/*.stories.ts']
    }),
    {
      name: 'copy-css',
      closeBundle() {
        // Only copy CSS when building the library (dist folder exists)
        if (existsSync('dist')) {
          copyFileSync('src/styles.css', 'dist/styles.css');
        }
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PatternFlySvelte',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'Svelte'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
});
