import Dialog from '@/components/dialog/dialog.vue';

const Plugin = {
  install(Vue) {
    if (this.installed) return;
    this.installed = true;


    Vue.prototype.$dialog = {
      show() {
        console.log('hello');
      },
      hide() {

      }
    };

    const Ctor = Vue.component('vue-dialog', Dialog);
  }
};

export default Plugin;