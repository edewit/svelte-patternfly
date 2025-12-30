import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Avatar from './Avatar.svelte';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Image source URL'
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the avatar image (required)'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size'
    },
    isBordered: {
      control: { type: 'boolean' },
      description: 'Whether the avatar has a border'
    }
  }
} satisfies Meta<Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: 'https://www.patternfly.org/images/img_avatar.svg',
    alt: 'Avatar image'
  }
};

export const Bordered: Story = {
  args: {
    src: 'https://www.patternfly.org/images/img_avatar.svg',
    alt: 'Avatar image bordered',
    isBordered: true
  }
};

export const Small: Story = {
  args: {
    src: 'https://www.patternfly.org/images/img_avatar.svg',
    alt: 'Avatar image small',
    size: 'sm'
  }
};

export const Medium: Story = {
  args: {
    src: 'https://www.patternfly.org/images/img_avatar.svg',
    alt: 'Avatar image medium',
    size: 'md'
  }
};

export const Large: Story = {
  args: {
    src: 'https://www.patternfly.org/images/img_avatar.svg',
    alt: 'Avatar image large',
    size: 'lg'
  }
};

export const ExtraLarge: Story = {
  args: {
    src: 'https://www.patternfly.org/images/img_avatar.svg',
    alt: 'Avatar image extra large',
    size: 'xl'
  }
};

export const WithoutImage: Story = {
  args: {
    alt: 'Default avatar icon'
  }
};

export const WithoutImageBordered: Story = {
  args: {
    alt: 'Default avatar icon bordered',
    isBordered: true
  }
};
