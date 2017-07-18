import 'babel-polyfill';
import Vue from 'vue';
import {router} from './router/';
import {store} from './store/';
import {i18n} from './i18n/';
import App from '@/pages/app/app.vue';
import '@/assets/css/main.css';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
