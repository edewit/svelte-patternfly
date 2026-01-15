import type { Meta, StoryObj } from '@storybook/svelte-vite';
import WizardExample from './WizardExample.svelte';

const meta = {
  title: 'Components/Wizard',
  component: WizardExample,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'basic',
        'with-header',
        'with-description',
        'custom-footer',
        'disabled-steps'
      ],
      description: 'Variant of the wizard example'
    }
  }
} satisfies Meta<WizardExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: 'basic'
  }
};

export const WithHeader: Story = {
  args: {
    variant: 'with-header'
  }
};

export const WithDescription: Story = {
  args: {
    variant: 'with-description'
  }
};

export const CustomFooter: Story = {
  args: {
    variant: 'custom-footer'
  }
};

export const DisabledSteps: Story = {
  args: {
    variant: 'disabled-steps'
  }
};
