import Snackbar from '@/components/snackbar/snackbar.vue';
import {bus} from '@/plugins/plugin-event-bus.js';

export default {
  install (Vue) {
    if (this.installed) return;
    this.installed = true;

    Vue.component('vue-snackbar', Snackbar);

    Vue.prototype.$snackbar = {
      show(params = 'testing') {
        console.log(this);
        bus.$emit('addSnackbarItem', params);
      }
    };
  }
};