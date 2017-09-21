const Dialog = {
  install(Vue, options) {
    Vue.prototype.$dialog = {
      show() {
        console.log(Vue, options);
      }
    };
  }
};

export default Dialog;