import type { Meta, StoryObj } from '@storybook/svelte';
import SidebarBasicExample from './SidebarBasicExample.svelte';
import SidebarStackExample from './SidebarStackExample.svelte';
import SidebarPanelRightExample from './SidebarPanelRightExample.svelte';
import SidebarStickyExample from './SidebarStickyExample.svelte';
import SidebarBorderExample from './SidebarBorderExample.svelte';

const meta: Meta = {
  title: 'Components/Sidebar',
  component: SidebarBasicExample,
  parameters: {
    docs: {
      description: {
        component:
          'A sidebar is a panel that splits content into a secondary area within a page.'
      }
    }
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: [undefined, 'stack'],
      description: 'Indicates the direction of the layout.'
    },
    isPanelRight: {
      control: 'boolean',
      description: 'Flag indicating that the panel is displayed to the right of the content.',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    hasGutter: {
      control: 'boolean',
      description: 'Flag indicating a gutter should be placed between the panel and content.',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    hasNoBackground: {
      control: 'boolean',
      description: 'Flag indicating that the sidebar should have no background.',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    class: {
      control: 'text',
      description: 'Additional classes applied to the sidebar container.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    Component: SidebarBasicExample
  }),
  parameters: {
    docs: {
      description: {
        story: 'A basic sidebar with a panel on the left and content on the right.'
      }
    }
  }
};

export const Stack: Story = {
  render: () => ({
    Component: SidebarStackExample
  }),
  parameters: {
    docs: {
      description: {
        story: 'A sidebar with the panel stacked on top of the content.'
      }
    }
  }
};

export const PanelRightWithGutter: Story = {
  render: () => ({
    Component: SidebarPanelRightExample
  }),
  parameters: {
    docs: {
      description: {
        story: 'A sidebar with the panel on the right and a gutter between panel and content.'
      }
    }
  }
};

export const StickyPanel: Story = {
  render: () => ({
    Component: SidebarStickyExample
  }),
  parameters: {
    docs: {
      description: {
        story:
          'A sidebar with a sticky panel that remains fixed while the content scrolls. A tabIndex should be added to the Sidebar when there is scrollable content.'
      }
    }
  }
};

export const Border: Story = {
  render: () => ({
    Component: SidebarBorderExample
  }),
  parameters: {
    docs: {
      description: {
        story: 'A sidebar with a bordered panel.'
      }
    }
  }
};

