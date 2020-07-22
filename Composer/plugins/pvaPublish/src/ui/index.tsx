import * as React from 'react';

import { PVADialog } from './authDialog';

// const thisPluginName = 'plugin-pva-publish';

// this is a function that composer will pass the plugin
//
// entry component will be the root component of the plugin's react UI
//
// this function will add it to the window object and allow composer to call it when it is ready
// function bootstrap(entryComponent) {
//   console.log('bootstrapping pva dialog');
//   window['pluginLoaded'] = true;
//   window['composer-plugins'][thisPluginName] = entryComponent;
//   console.log('done loading pva publish');
// }

// bootstrap(PVADialog);

// if (document.getElementById('pva-root')) {
//   ReactDOM.render(<PVADialog />, document.getElementById('pva-root'));
// }

window['Composer'].render(<PVADialog />);
window['testFunc']();

// if (document.getElementById('pva-root')) {
//   render(<PVADialog />, document.getElementById('pva-root'));
// }
