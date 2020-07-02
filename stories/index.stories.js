import { storiesOf } from '@storybook/svelte';

import Alert from './alert/Index.svelte';
import Avatar from './avatar/Index.svelte';
import Badge from './badge/Index.svelte';
import Breadcrumbs from './breadcrumb/Index.svelte';
import Button from './button/Index.svelte';
import Card from './card/Index.svelte';
import Checkbox from './check/Index.svelte';

const story = Component => () => ({
  Component
});

// storiesOf('Introduction', module)
//   .add('Get Started', story(Welcome))
  
  storiesOf('Components', module)
  .add('Alert', story(Alert))
  .add('Avatar', story(Avatar))
  .add('Badge', story(Badge))
  .add('Breadcrumb', story(Breadcrumbs))
  .add('Button', story(Button))
  .add('Card', story(Card))
  .add('Checkbox', story(Checkbox));
