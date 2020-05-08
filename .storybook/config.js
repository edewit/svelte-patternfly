import { addDecorator, addParameters, configure } from '@storybook/svelte';
import { withKnobs } from '@storybook/addon-knobs';
import pkg from '../package.json';

// Option defaults:
addParameters({
  options: {
    name: `${pkg.name} ${pkg.version}`,
    url: 'https://github.com/edewit/svelte-patternfly',
    panelPosition: 'right',
    showPanel: false
  },
});

addDecorator(withKnobs());

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
