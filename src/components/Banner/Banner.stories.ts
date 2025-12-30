import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Banner from './Banner.svelte';
import { createRawSnippet } from 'svelte';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    colorVariant: {
      control: { type: 'select' },
      options: [
        'default',
        'red',
        'orangered',
        'orange',
        'yellow',
        'green',
        'teal',
        'blue',
        'purple'
      ],
      description: 'Banner color variant (non-status)'
    },
    statusVariant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'danger', 'info', 'custom'],
      description: 'Banner status variant'
    },
    isSticky: {
      control: { type: 'boolean' },
      description: 'Whether the banner is sticky to the top'
    },
    screenReaderText: {
      control: { type: 'text' },
      description: 'Screen reader text for status banners'
    },
    customIcon: {
      control: { type: 'text' },
      description: 'Custom icon class'
    }
  }
} satisfies Meta<Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Default: Story = {
  args: {
    children: textSnippet('Default banner')
  }
};

export const Red: Story = {
  args: {
    colorVariant: 'red',
    children: textSnippet('Red banner')
  }
};

export const Orangered: Story = {
  args: {
    colorVariant: 'orangered',
    children: textSnippet('Orangered banner')
  }
};

export const Orange: Story = {
  args: {
    colorVariant: 'orange',
    children: textSnippet('Orange banner')
  }
};

export const Yellow: Story = {
  args: {
    colorVariant: 'yellow',
    children: textSnippet('Yellow banner')
  }
};

export const Green: Story = {
  args: {
    colorVariant: 'green',
    children: textSnippet('Green banner')
  }
};

export const Teal: Story = {
  args: {
    colorVariant: 'teal',
    children: textSnippet('Teal banner')
  }
};

export const Blue: Story = {
  args: {
    colorVariant: 'blue',
    children: textSnippet('Blue banner')
  }
};

export const Purple: Story = {
  args: {
    colorVariant: 'purple',
    children: textSnippet('Purple banner')
  }
};

export const WithLink: Story = {
  args: {
    children: textSnippet('Default banner with <a href="#">a link</a>')
  }
};

export const WithDisabledLink: Story = {
  args: {
    children: textSnippet(
      'Default banner with <a href="#" class="pf-m-disabled">a disabled link</a>'
    )
  }
};

export const WithInlineLinkButton: Story = {
  args: {
    colorVariant: 'blue',
    children: textSnippet(`
      Blue banner with an inline link button
      <button class="pf-v6-c-button pf-m-inline pf-m-link" type="button">
        <span class="pf-v6-c-button__text">Link button</span>
      </button>
    `)
  }
};

export const SuccessStatus: Story = {
  args: {
    statusVariant: 'success',
    screenReaderText: 'Success banner:',
    children: textSnippet('Success banner')
  }
};

export const WarningStatus: Story = {
  args: {
    statusVariant: 'warning',
    screenReaderText: 'Warning banner:',
    children: textSnippet('Warning banner')
  }
};

export const DangerStatus: Story = {
  args: {
    statusVariant: 'danger',
    screenReaderText: 'Danger banner:',
    children: textSnippet('Danger banner')
  }
};

export const InfoStatus: Story = {
  args: {
    statusVariant: 'info',
    screenReaderText: 'Info banner:',
    children: textSnippet('Info banner')
  }
};

export const CustomStatus: Story = {
  args: {
    statusVariant: 'custom',
    customIcon: 'fas fa-fw fa-bell',
    screenReaderText: 'Custom banner:',
    children: textSnippet('Custom banner')
  }
};

export const Sticky: Story = {
  args: {
    colorVariant: 'blue',
    isSticky: true,
    children: textSnippet('Sticky banner')
  }
};
