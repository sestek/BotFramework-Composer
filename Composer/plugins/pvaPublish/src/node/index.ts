// this will be called by composer
function initialize(registration) {
  const plugin = {
    history: getHistory,
  };
  registration.addPublishMethod(plugin, null, null, true /** we have custom UI to host */);

  // registration.on('selectPublishTarget', (event) => {
  //   console.log('plugin got event: ', event);
  // });
}

async function getHistory(config, project, user) {
  return [];
}

module.exports = {
  initialize,
};
