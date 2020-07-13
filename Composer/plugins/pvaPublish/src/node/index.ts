import { join } from 'path';
import { readFileSync } from 'fs';

function getReactHTML(): string {
  const html = readFileSync(join(__dirname, 'index.html')).toString();
  return html;
}

// this will be called by composer
function initialize(registration) {
  const reactHTML = getReactHTML();
  console.log('got html: ', reactHTML);
  const plugin = {};
  registration.addPublishMethod(plugin, null, 'Select your dropdown', reactHTML);

  // registration.on('selectPublishTarget', (event) => {
  //   console.log('plugin got event: ', event);
  // });
}

module.exports = {
  initialize,
};
