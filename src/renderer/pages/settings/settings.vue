<template>
  <div class='container'>
    <vue-header :title='$t("settings")'></vue-header>
    <label for='locale'>{{$tc('language', 1)}}</label>
    <select name='locale' v-model='locale'>
      <option value='en-CA'>English</option>
      <option value='fr-CA'>Français</option>
      <option value='de-DE' disabled>Deutsch</option>
      <option value='jp-JP' disabled>日本語</option>
    </select>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue';

export default {
  name: 'Settings',
  data: function() {
    return {locale: this.$i18n.locale};
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  },
  components: {
    'vue-header': Header
  }
};
</script>
