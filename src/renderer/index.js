import 'babel-polyfill';
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import Dialog from '@/plugins/dialog/dialog.js';
import Snackbar from '@/plugins/snackbar/snackbar.js';
import Toast from 'vue-toasted';
import {router} from './router/';
import {store} from './store/';
import {i18n} from './i18n/';
import App from '@/pages/app/app.vue';
import '@/assets/css/main.css';

Vue.config.productionTip = false;
Vue.use(Dialog);
Vue.use(Snackbar);
Vue.use(Toast);
Vue.use(AsyncComputed);

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
