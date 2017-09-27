import Dialog from '@/components/dialog/dialog.vue';
import {bus} from '@/plugins/plugin-event-bus.js';

export default {
  install(Vue) {
    if (this.installed) return;
    this.installed = true;

    Vue.component('vue-dialog', Dialog);
    Vue.prototype.$dialog = {
      show(params) {
        bus.$emit('addDialog', params);
      },
      hide() {

      }
    };

  }
};