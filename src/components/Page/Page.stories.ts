import type { Meta, StoryObj } from '@storybook/svelte-vite';
import PageExample from './PageExample.svelte';

const meta = {
  title: 'Components/Page',
  component: PageExample,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'ID for the page element'
    },
    showSidebar: {
      control: { type: 'boolean' },
      description: 'Whether to show the sidebar'
    },
    showNavigation: {
      control: { type: 'boolean' },
      description: 'Whether to show navigation in the sidebar'
    },
    sidebarContent: {
      control: { type: 'text' },
      description: 'Content to display in the sidebar when navigation is not shown'
    },
    section1Title: {
      control: { type: 'text' },
      description: 'Title for the first section'
    },
    section2Title: {
      control: { type: 'text' },
      description: 'Title for the second section'
    },
    section3Title: {
      control: { type: 'text' },
      description: 'Title for the third section'
    },
    useManagedSidebar: {
      control: { type: 'boolean' },
      description: 'Whether to use managed sidebar (uncontrolled mode)'
    },
    isContentFilled: {
      control: { type: 'boolean' },
      description: 'Whether page sections should fill available vertical space'
    }
  }
} satisfies Meta<PageExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalNavigation: Story = {
  args: {
    id: 'vertical-nav-example',
    showSidebar: true,
    showNavigation: true
  }
};

export const VerticalNavigationWithoutNav: Story = {
  args: {
    id: 'vertical-nav-no-nav-example',
    showSidebar: true,
    showNavigation: false,
    sidebarContent: 'Sidebar content without navigation'
  }
};

export const WithoutSidebar: Story = {
  args: {
    id: 'no-sidebar-example',
    showSidebar: false,
    showNavigation: false
  }
};

export const ManagedSidebar: Story = {
  args: {
    id: 'managed-sidebar-example',
    showSidebar: true,
    showNavigation: true,
    useManagedSidebar: true
  }
};

export const ContentFilled: Story = {
  args: {
    id: 'content-filled-example',
    showSidebar: true,
    showNavigation: true,
    isContentFilled: true
  }
};

export const CustomTitles: Story = {
  args: {
    id: 'custom-titles-example',
    showSidebar: true,
    showNavigation: true,
    section1Title: 'Custom Section 1',
    section2Title: 'Custom Section 2',
    section3Title: 'Custom Section 3'
  }
};

