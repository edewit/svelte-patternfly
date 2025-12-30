import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Content from './Content.svelte';
import { ContentVariants } from './types';
import { createRawSnippet } from 'svelte';

const meta = {
  title: 'Components/Content',
  component: Content,
  tags: ['autodocs'],
  argTypes: {
    component: {
      control: { type: 'select' },
      options: Object.values(ContentVariants),
      description: 'HTML element type to render'
    },
    isPageTitle: {
      control: { type: 'boolean' },
      description: 'Apply page title styling to h1'
    },
    isPlain: {
      control: { type: 'boolean' },
      description: 'Apply plain styling to lists or links'
    },
    isEditorial: {
      control: { type: 'boolean' },
      description: 'Apply editorial styling (larger font sizes)'
    },
    href: {
      control: { type: 'text' },
      description: 'URL for anchor elements'
    }
  }
} satisfies Meta<Content>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Wrapper: Story = {
  render: () => ({
    Component: Content,
    props: {
      children: createRawSnippet(() => ({
        render: () => `
          <Content component="${ContentVariants.p}">
            Content with a component of type "p" still renders the same when wrapped with a Content.
          </Content>
          <p>If located within a wrapping Content, html elements are styled as well!</p>
        `
      }))
    }
  })
};

export const Heading1: Story = {
  args: {
    component: ContentVariants.h1,
    isPageTitle: true
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: textSnippet('Hello World')
    }
  })
};

export const Heading2: Story = {
  args: {
    component: ContentVariants.h2
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: textSnippet('Second level')
    }
  })
};

export const Paragraph: Story = {
  args: {
    component: ContentVariants.p
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: textSnippet('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
    }
  })
};

export const Link: Story = {
  args: {
    component: ContentVariants.a,
    href: '#'
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: textSnippet('Click to visit link')
    }
  })
};

export const UnorderedList: Story = {
  args: {
    component: ContentVariants.ul
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: createRawSnippet(() => ({
        render: () => `
          <li class="pf-v6-c-content--li">Item 1</li>
          <li class="pf-v6-c-content--li">Item 2</li>
          <li class="pf-v6-c-content--li">Item 3</li>
        `
      }))
    }
  })
};

export const OrderedList: Story = {
  args: {
    component: ContentVariants.ol
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: createRawSnippet(() => ({
        render: () => `
          <li class="pf-v6-c-content--li">First item</li>
          <li class="pf-v6-c-content--li">Second item</li>
          <li class="pf-v6-c-content--li">Third item</li>
        `
      }))
    }
  })
};

export const PlainList: Story = {
  args: {
    component: ContentVariants.ul,
    isPlain: true
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: createRawSnippet(() => ({
        render: () => `
          <li class="pf-v6-c-content--li">Plain item 1</li>
          <li class="pf-v6-c-content--li">Plain item 2</li>
        `
      }))
    }
  })
};

export const Blockquote: Story = {
  args: {
    component: ContentVariants.blockquote
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: textSnippet(
        'Ut venenatis, nisl scelerisque sollicitudin fermentum, quam libero hendrerit ipsum.'
      )
    }
  })
};

export const HorizontalRule: Story = {
  args: {
    component: ContentVariants.hr
  },
  render: (args: any) => ({
    Component: Content,
    props: args
  })
};

export const DescriptionList: Story = {
  args: {
    component: ContentVariants.dl
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: createRawSnippet(() => ({
        render: () => `
          <dt class="pf-v6-c-content--dt">Web</dt>
          <dd class="pf-v6-c-content--dd">The part of the Internet that contains websites and web pages</dd>
          <dt class="pf-v6-c-content--dt">HTML</dt>
          <dd class="pf-v6-c-content--dd">A markup language for creating web pages</dd>
        `
      }))
    }
  })
};

export const Small: Story = {
  args: {
    component: ContentVariants.small
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: textSnippet('Sometimes you need small text to display things like date created')
    }
  })
};

export const Editorial: Story = {
  args: {
    isEditorial: true
  },
  render: (args: any) => ({
    Component: Content,
    props: {
      ...args,
      children: createRawSnippet(() => ({
        render: () => `
          <h1 class="pf-v6-c-content--h1 pf-m-page-title">Example of editorial content</h1>
          <p class="pf-v6-c-content--p">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        `
      }))
    }
  })
};
