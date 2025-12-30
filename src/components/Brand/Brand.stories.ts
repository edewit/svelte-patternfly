import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Brand from './Brand.svelte';

const meta = {
  title: 'Components/Brand',
  component: Brand,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Image source URL (required)'
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the brand image (required)'
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the brand image (CSS value or number)'
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the brand image (CSS value or number)'
    }
  }
} satisfies Meta<Brand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: '/assets/images/PF-HorizontalLogo-Color.svg',
    alt: 'PatternFly logo'
  }
};

export const WithCustomSize: Story = {
  args: {
    src: '/assets/images/PF-HorizontalLogo-Color.svg',
    alt: 'PatternFly logo',
    width: '200px',
    height: '50px'
  }
};

export const WithNumericSize: Story = {
  args: {
    src: '/assets/images/PF-HorizontalLogo-Color.svg',
    alt: 'PatternFly logo',
    width: 300,
    height: 75
  }
};
