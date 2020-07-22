import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { PVADialog } from './authDialog';

const thisPluginName = 'plugin-pva-publish';

// this is a function that composer will pass the plugin
//
// entry component will be the root component of the plugin's react UI
//
// this function will add it to the window object and allow composer to call it when it is ready
function bootstrap(entryComponent) {
  if (!window['composer-plugins']) {
    window['composer-plugins'] = [];
  }
  window['composer-plugins'][thisPluginName] = entryComponent;
}

console.log('bootstrapping pva dialog');
bootstrap(PVADialog);

if (document.getElementById('pva-root')) {
  ReactDOM.render(<PVADialog />, document.getElementById('pva-root'));
}

// if (document.getElementById('pva-root')) {
//   render(<PVADialog />, document.getElementById('pva-root'));
// }
