import 'babel-polyfill';
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import Dialog from '@/plugins/dialog.js';
import {router} from './router/';
import {store} from './store/';
import {i18n} from './i18n/';
import App from '@/pages/app/app.vue';
import '@/assets/css/main.css';

Vue.config.productionTip = false;
Vue.use(Dialog);
Vue.use(AsyncComputed);

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
