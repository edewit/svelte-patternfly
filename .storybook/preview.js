/** @type { import('@storybook/svelte-vite').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Components'],
      },
    },
    docs: {
      tags: ['autodocs'],
      codePanel: true
    },
  },
  globalTypes: {},
  decorators: [],
};

export default preview;

