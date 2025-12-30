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

### Button

The Button component supports all PatternFly button variants and features.

#### Variants

- `primary` - Primary button (default)
- `secondary` - Secondary button
- `tertiary` - Tertiary button
- `danger` - Danger button
- `warning` - Warning button
- `link` - Link button
- `plain` - Plain button
- `control` - Control button
- `stateful` - Stateful button

#### Props

| Prop             | Type                                | Default     | Description                                     |
| ---------------- | ----------------------------------- | ----------- | ----------------------------------------------- |
| `variant`        | `ButtonVariant`                     | `'primary'` | Button variant style                            |
| `size`           | `'sm' \| 'md' \| 'lg'`              | `'md'`      | Button size                                     |
| `isDisabled`     | `boolean`                           | `false`     | Whether the button is disabled                  |
| `isDanger`       | `boolean`                           | `false`     | Whether the button has danger styling           |
| `isBlock`        | `boolean`                           | `false`     | Whether the button spans full width             |
| `isInline`       | `boolean`                           | `false`     | Whether the button is inline (for link variant) |
| `isAriaDisabled` | `boolean`                           | `false`     | Whether the button is aria-disabled (for links) |
| `component`      | `'button' \| 'a' \| 'span'`         | `'button'`  | HTML element to render                          |
| `href`           | `string`                            | -           | URL for link buttons                            |
| `type`           | `'button' \| 'submit' \| 'reset'`   | `'button'`  | Button type (for button elements)               |
| `inProgress`     | `boolean`                           | `false`     | Whether to show progress indicator              |
| `statefulState`  | `'read' \| 'unread' \| 'attention'` | -           | State for stateful variant                      |
| `count`          | `number`                            | -           | Count badge to display                          |

#### Examples

```svelte
<!-- Primary button -->
<Button variant="primary">Primary</Button>

<!-- Secondary button -->
<Button variant="secondary">Secondary</Button>

<!-- Small button -->
<Button size="sm">Small</Button>

<!-- Disabled button -->
<Button isDisabled>Disabled</Button>

<!-- Link button -->
<Button variant="link" component="a" href="https://example.com">Link</Button>

<!-- Button with progress indicator -->
<Button inProgress>Loading</Button>

<!-- Button with count -->
<Button count={5}>Notifications</Button>

<!-- Stateful button -->
<Button variant="stateful" statefulState="unread">Stateful</Button>
```

## Development

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
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
