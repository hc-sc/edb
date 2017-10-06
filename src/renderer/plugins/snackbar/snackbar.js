import Snackbar from '@/components/snackbar/snackbar.vue';
import {bus} from '@/plugins/plugin-event-bus.js';

export default {
  install (Vue) {
    if (this.installed) return;
    this.installed = true;

    Vue.component('vue-snackbar', Snackbar);

    Vue.prototype.$snackbar = {
      show(params) {
        console.log('here');
        if (params) bus.$emit('addSnackbarItem', params);
      },
      hide() {
        bus.$emit('hideDialog');
      }
    };
  }
};