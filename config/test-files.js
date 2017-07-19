import 'babel-polyfill';
import Vue from 'vue';

Vue.config.productionTip = false;

const testsContext = require.context('../src', true, /chips\.test\.js$/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../src', true, /^\.\/(?!index)\.js$/);
srcContext.keys().forEach(srcContext);
