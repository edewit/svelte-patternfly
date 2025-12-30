import Alert from './alert/Index.svelte';
import Avatar from './avatar/Index.svelte';
import Badge from './badge/Index.svelte';
import Breadcrumbs from './breadcrumb/Index.svelte';
import Button from './button/Index.svelte';
import Card from './card/Index.svelte';
import Checkbox from './check/Index.svelte';
import Chip from './chip/Index.svelte';

export default {
  title: 'Components',
  tags: ['autodocs'],
};

export const AlertStory = {
  render: () => ({
    Component: Alert,
  }),
};

export const AvatarStory = {
  render: () => ({
    Component: Avatar,
  }),
};

export const BadgeStory = {
  render: () => ({
    Component: Badge,
  }),
};

export const BreadcrumbStory = {
  render: () => ({
    Component: Breadcrumbs,
  }),
};

export const ButtonStory = {
  render: () => ({
    Component: Button,
  }),
};

export const CardStory = {
  render: () => ({
    Component: Card,
  }),
};

export const CheckboxStory = {
  render: () => ({
    Component: Checkbox,
  }),
};

export const ChipStory = {
  render: () => ({
    Component: Chip,
  }),
};
