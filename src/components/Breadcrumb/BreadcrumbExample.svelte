<script lang="ts">
  import Breadcrumb from './Breadcrumb.svelte';
  import type { BreadcrumbItem } from './types';

  const basicItems: BreadcrumbItem[] = [
    { href: '#', text: 'Section home' },
    { href: '#', text: 'Section title' },
    { href: '#', text: 'Section title' },
    { href: '#', text: 'Section landing', isCurrent: true }
  ];

  const dropdownItems: BreadcrumbItem[] = [
    { href: '#', text: 'Section home' },
    { href: '#', text: 'Section title' },
    {
      type: 'dropdown',
      dropdownCount: 3,
      isExpanded: false,
      dropdownItems: [
        { text: 'Edit', href: '#' },
        { text: 'Deployment', href: '#' },
        { text: 'Applications', href: '#' }
      ]
    },
    { type: 'heading', href: '#', text: 'Section title', isCurrent: true, headingLevel: 1 }
  ];
</script>

<div>
  <h2>Basic Breadcrumb</h2>
  <Breadcrumb items={basicItems} />
</div>

<div style="margin-top: 2rem;">
  <h2>Breadcrumb with Dropdown Menu</h2>
  <Breadcrumb items={dropdownItems} />
</div>
