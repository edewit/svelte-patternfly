# PatternFly Svelte

A Svelte component library implementing PatternFly design system components.

## Installation

```bash
npm install @patternfly/svelte @patternfly/patternfly
```

## Usage

```svelte
<script>
  import { Button } from '@patternfly/svelte';
  import '@patternfly/svelte/styles.css';
</script>

<Button variant="primary">Click me</Button>
```

## Components

📖 **[View the Storybook](https://edewit.github.io/svelte-patternfly/)** for live examples and documentation.

The following PatternFly components are available:

| Component | PatternFly Docs |
| --------- | --------------- |
| Accordion | [Docs](https://www.patternfly.org/components/accordion) |
| Action List | [Docs](https://www.patternfly.org/components/action-list) |
| Alert | [Docs](https://www.patternfly.org/components/alert) |
| Avatar | [Docs](https://www.patternfly.org/components/avatar) |
| Badge | [Docs](https://www.patternfly.org/components/badge) |
| Banner | [Docs](https://www.patternfly.org/components/banner) |
| Brand | [Docs](https://www.patternfly.org/components/brand) |
| Breadcrumb | [Docs](https://www.patternfly.org/components/breadcrumb) |
| Button | [Docs](https://www.patternfly.org/components/button) |
| Calendar Month | [Docs](https://www.patternfly.org/components/date-and-time/calendar-month) |
| Card | [Docs](https://www.patternfly.org/components/card) |
| Checkbox | [Docs](https://www.patternfly.org/components/forms/checkbox) |
| Clipboard Copy | [Docs](https://www.patternfly.org/components/clipboard-copy) |
| Code Block | [Docs](https://www.patternfly.org/components/code-block) |
| Content | [Docs](https://www.patternfly.org/components/content) |
| Data List | [Docs](https://www.patternfly.org/components/data-list) |
| Date Picker | [Docs](https://www.patternfly.org/components/date-and-time/date-picker) |
| Date Time Picker | [Docs](https://www.patternfly.org/components/date-and-time/date-picker) |
| Description List | [Docs](https://www.patternfly.org/components/description-list) |
| Drawer | [Docs](https://www.patternfly.org/components/drawer) |
| Dropdown | [Docs](https://www.patternfly.org/components/menus/dropdown) |
| Dual List Selector | [Docs](https://www.patternfly.org/components/dual-list-selector) |
| Empty State | [Docs](https://www.patternfly.org/components/empty-state) |
| Expandable Section | [Docs](https://www.patternfly.org/components/expandable-section) |
| Form | [Docs](https://www.patternfly.org/components/forms/form) |
| Form Select | [Docs](https://www.patternfly.org/components/forms/form-select) |
| Helper Text | [Docs](https://www.patternfly.org/components/helper-text) |
| Hint | [Docs](https://www.patternfly.org/components/hint) |
| Icon | [Docs](https://www.patternfly.org/components/icon) |
| Input Group | [Docs](https://www.patternfly.org/components/input-group) |
| Jump Links | [Docs](https://www.patternfly.org/components/jump-links) |
| Label | [Docs](https://www.patternfly.org/components/label) |
| List | [Docs](https://www.patternfly.org/components/list) |
| Masthead | [Docs](https://www.patternfly.org/components/masthead) |
| Menu | [Docs](https://www.patternfly.org/components/menus/menu) |
| Menu Toggle | [Docs](https://www.patternfly.org/components/menus/menu-toggle) |
| Modal | [Docs](https://www.patternfly.org/components/modal) |
| Multiple File Upload | [Docs](https://www.patternfly.org/components/file-upload-multiple) |
| Navigation | [Docs](https://www.patternfly.org/components/navigation) |
| Notification Badge | [Docs](https://www.patternfly.org/components/notification-badge) |
| Notification Drawer | [Docs](https://www.patternfly.org/components/notification-drawer) |
| Number Input | [Docs](https://www.patternfly.org/components/number-input) |
| Options Menu | [Docs](https://www.patternfly.org/components/menus/options-menu) |
| Overflow Menu | [Docs](https://www.patternfly.org/components/menus/overflow-menu) |
| Page | [Docs](https://www.patternfly.org/components/page) |
| Pagination | [Docs](https://www.patternfly.org/components/pagination) |
| Panel | [Docs](https://www.patternfly.org/components/panel) |
| Popover | [Docs](https://www.patternfly.org/components/popover) |
| Progress | [Docs](https://www.patternfly.org/components/progress) |
| Progress Stepper | [Docs](https://www.patternfly.org/components/progress-stepper) |
| Radio | [Docs](https://www.patternfly.org/components/forms/radio) |
| Search Input | [Docs](https://www.patternfly.org/components/search-input) |
| Select | [Docs](https://www.patternfly.org/components/menus/select) |
| Sidebar | [Docs](https://www.patternfly.org/components/sidebar) |
| Simple File Upload | [Docs](https://www.patternfly.org/components/file-upload) |
| Simple List | [Docs](https://www.patternfly.org/components/simple-list) |
| Skeleton | [Docs](https://www.patternfly.org/components/skeleton) |
| Slider | [Docs](https://www.patternfly.org/components/slider) |
| Spinner | [Docs](https://www.patternfly.org/components/spinner) |
| Switch | [Docs](https://www.patternfly.org/components/switch) |
| Table | [Docs](https://www.patternfly.org/components/table) |
| Tabs | [Docs](https://www.patternfly.org/components/tabs) |
| Text Area | [Docs](https://www.patternfly.org/components/forms/text-area) |
| Text Input | [Docs](https://www.patternfly.org/components/forms/text-input) |
| Text Input Group | [Docs](https://www.patternfly.org/components/text-input-group) |
| Time Picker | [Docs](https://www.patternfly.org/components/date-and-time/time-picker) |
| Timestamp | [Docs](https://www.patternfly.org/components/timestamp) |
| Title | [Docs](https://www.patternfly.org/components/title) |
| Toggle Group | [Docs](https://www.patternfly.org/components/toggle-group) |
| Toolbar | [Docs](https://www.patternfly.org/components/toolbar) |
| Tree View | [Docs](https://www.patternfly.org/components/tree-view) |
| Truncate | [Docs](https://www.patternfly.org/components/truncate) |
| Wizard | [Docs](https://www.patternfly.org/components/wizard) |

## Development

### Setup

```bash
npm install
```

### For development run storybook

```bash
npm run storybook
```

### Build

```bash
npm run build
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## License

MIT
