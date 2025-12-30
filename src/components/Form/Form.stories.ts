import type { Meta, StoryObj } from '@storybook/svelte-vite';
import Form from './Form.svelte';
import FormGroup from './FormGroup.svelte';
import FormHelperText from './FormHelperText.svelte';
import HelperText from '../HelperText/HelperText.svelte';
import HelperTextItem from '../HelperText/HelperTextItem.svelte';
import FormGroupLabelHelp from './FormGroupLabelHelp.svelte';
import ActionGroup from './ActionGroup.svelte';
import TextInput from '../TextInput/TextInput.svelte';
import Checkbox from '../Checkbox/Checkbox.svelte';
import Radio from '../Radio/Radio.svelte';
import Button from '../Button/Button.svelte';
import Popover from '../Popover/Popover.svelte';
import { createRawSnippet } from 'svelte';
import FormExample from './FormExample.svelte';
import FormHorizontalExample from './FormHorizontalExample.svelte';
import FormLimitWidthExample from './FormLimitWidthExample.svelte';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    isHorizontal: {
      control: { type: 'boolean' },
      description: 'Sets the Form to horizontal layout'
    },
    isWidthLimited: {
      control: { type: 'boolean' },
      description: 'Limits the max-width of the form'
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Sets a custom max-width for the form'
    }
  }
} satisfies Meta<Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create text snippets for Storybook
const textSnippet = (text: string) => createRawSnippet(() => ({ render: () => text }));

export const Basic: Story = {
  render: () => ({
    Component: FormExample
  })
};

export const Horizontal: Story = {
  render: () => ({
    Component: FormHorizontalExample
  })
};

export const LimitWidth: Story = {
  render: () => ({
    Component: FormLimitWidthExample
  })
};

export const WithLabelHelp: Story = {
  render: () => ({
    Component: FormExample
  })
};
