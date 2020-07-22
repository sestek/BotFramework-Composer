import { Main } from './main';

const thisPluginName = 'tony-publish';

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

console.log('bootstrapping tony publish');
bootstrap(Main);
