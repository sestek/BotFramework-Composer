window.Composer = {};
window.Composer['render'] = function (component) {
  console.log(React);
  console.log(ReactDOM);
  ReactDOM.render(component, document.getElementById('plugin-root'));
};
console.log('preloaded plugin host script');
