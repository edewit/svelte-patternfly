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
| Popover | [Docs](https://www.patternfly.org/components/popover) |
| Radio | [Docs](https://www.patternfly.org/components/forms/radio) |
| Select | [Docs](https://www.patternfly.org/components/menus/select) |
| Simple File Upload | [Docs](https://www.patternfly.org/components/file-upload) |
| Text Area | [Docs](https://www.patternfly.org/components/forms/text-area) |
| Text Input | [Docs](https://www.patternfly.org/components/forms/text-input) |
| Time Picker | [Docs](https://www.patternfly.org/components/date-and-time/time-picker) |
| Toolbar | [Docs](https://www.patternfly.org/components/toolbar) |

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
