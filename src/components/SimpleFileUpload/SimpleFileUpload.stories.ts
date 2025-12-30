import type { Meta, StoryObj } from '@storybook/svelte-vite';
import SimpleFileUpload from './SimpleFileUpload.svelte';
import SimpleFileUploadExample from './SimpleFileUploadExample.svelte';
import SimpleFileUploadCustomPreviewExample from './SimpleFileUploadCustomPreviewExample.svelte';

const meta = {
  title: 'Components/SimpleFileUpload',
  component: SimpleFileUpload,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [undefined, 'text'],
      description: 'File upload type'
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Whether the component is in loading state'
    },
    allowEditingUploadedText: {
      control: { type: 'boolean' },
      description: 'Whether uploaded text can be edited'
    },
    hideDefaultPreview: {
      control: { type: 'boolean' },
      description: 'Whether to hide the default preview'
    },
    browseButtonText: {
      control: { type: 'text' },
      description: 'Text for the browse button'
    },
    filenamePlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder text for filename input'
    }
  }
} satisfies Meta<SimpleFileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleTextFile: Story = {
  render: () => ({
    Component: SimpleFileUploadExample
  })
};

export const WithHelperText: Story = {
  render: () => ({
    Component: SimpleFileUpload,
    props: {
      id: 'text-file-with-helper',
      type: 'text',
      filenamePlaceholder: 'Drag and drop a file or upload one',
      browseButtonText: 'Upload'
    }
  })
};

export const TextFileWithEditsAllowed: Story = {
  render: () => ({
    Component: SimpleFileUpload,
    props: {
      id: 'text-file-editable',
      type: 'text',
      value: 'Sample file content',
      filename: 'sample.txt',
      allowEditingUploadedText: true,
      browseButtonText: 'Upload'
    }
  })
};

export const TextFileWithRestrictions: Story = {
  render: () => ({
    Component: SimpleFileUpload,
    props: {
      id: 'text-file-restricted',
      type: 'text',
      filenamePlaceholder: 'Drag and drop a file or upload one',
      browseButtonText: 'Upload',
      dropzoneProps: {
        accept: {
          'text/csv': ['.csv']
        },
        maxSize: 1024 // 1 KB
      }
    }
  })
};

export const SimpleFileOfAnyFormat: Story = {
  render: () => ({
    Component: SimpleFileUpload,
    props: {
      id: 'file-any-format',
      filenamePlaceholder: 'Drag and drop a file or upload one',
      browseButtonText: 'Upload'
    }
  })
};

export const CustomFilePreview: Story = {
  render: () => ({
    Component: SimpleFileUploadCustomPreviewExample
  })
};

export const Loading: Story = {
  render: () => ({
    Component: SimpleFileUpload,
    props: {
      id: 'file-upload-loading',
      type: 'text',
      filename: 'Sample.png',
      isLoading: true,
      browseButtonText: 'Upload'
    }
  })
};

export const WithError: Story = {
  render: () => ({
    Component: SimpleFileUpload,
    props: {
      id: 'file-upload-error',
      type: 'text',
      filename: 'Sample.png',
      isInvalid: true,
      helperText: 'Must be a CSV file no larger than 1 KB',
      browseButtonText: 'Upload'
    }
  })
};
