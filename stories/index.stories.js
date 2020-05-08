import { storiesOf } from '@storybook/svelte';

import Alert from './alert/Index.svelte';
import Badge from './badge/Index.svelte';
import Breadcrumbs from './breadcrumb/Index.svelte';
import Button from './button/Index.svelte';

const story = Component => () => ({
  Component
});

// storiesOf('Introduction', module)
//   .add('Get Started', story(Welcome))
  
  storiesOf('Components', module)
  .add('Alert', story(Alert))
  .add('Badge', story(Badge))
  .add('Breadcrumb', story(Breadcrumbs))
  .add('Button', story(Button));
