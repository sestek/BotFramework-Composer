// add the react mount point
if (!document.getElementById('plugin-root')) {
  const root = document.createElement('div');
  root.id = 'plugin-root';
  document.body.appendChild(root);
}
// initialize the API object
window.Composer = {};
// init the render function
window.Composer['render'] = function (component) {
  ReactDOM.render(component, document.getElementById('plugin-root'));
};
console.log('plugin-host-preload done loading');
