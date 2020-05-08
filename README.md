## Patternfly 4 components for Svelte v3

**Work in progress, check back soon - PRs are welcome!**

The component names and interface are inspired by the [patternfly-react](https://github.com/patternfly/patternfly-react) library for React.

### Status WIP

Just started this, a lot of components are still missing

----

## Install ( when it's released 😉 )

`npm install --save svelte svelte-patternfly`

## Usage

_You need to include a link to patternfly stylesheet in your page - these components do not include or embed any patternfly styles automatically._

Either in your HTML layout:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/@patternfly/patternfly@2/patternfly.css">
</head>
```

Or add from your Svelte app:

```html
<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/@patternfly/patternfly@2/patternfly.css">
</svelte:head>
```

In your svelte component:

```html
<script>
  import { Button } from 'svelte-patternfly';
</script>

<Button variant="primary">Hello World!</Button>
```

### Note on server-side rendering (SSR) Usage:

If you are using svelte-patternfly in an SSR environment like Sapper, 
it's recommended you import the component source directly, for example:

```html
<script>
  import Button from 'svelte-patternfly/src/Button.svelte';
</script>

<Button variant="primary">Hello World!</Button>
```
