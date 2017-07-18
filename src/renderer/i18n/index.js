import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en-CA.js';
import fr from './fr-CA.js';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en-CA',
  fallbackLocale: 'en-CA',
  messages: {
    'en-CA': en,
    'fr-CA': fr
  }
});

export {i18n};
