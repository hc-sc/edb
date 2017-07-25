<template>
  <div>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{$tc('setting', 2)}}
    </vue-header>
     <vue-select id='language' :label='$tc("language", 1)' v-model='locale' :options='languages'></vue-select>
  </div>
  <!-- <div class='container'>
    <vue-header :title='$t("settings")'></vue-header>
    <label for='locale'>{{$tc('language', 1)}}</label>
    <select name='locale' v-model='locale'>
      <option value='en-CA'>English</option>
      <option value='fr-CA'>Français</option>
      <option value='de-DE' disabled>Deutsch</option>
      <option value='jp-JP' disabled>日本語</option>
    </select>
  </div> -->
</template>

<script>
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import Select from '@/components/select/select.vue';
import {navigation} from '@/mixins/navigation.js';

export default {
  name: 'Settings',
  mixins: [navigation],
  data() {
    return {
      locale: this.$i18n.locale,
      languages: [
        {label: this.$tc('english'), value: 'en-CA'},
        {label: this.$tc('french'), value: 'fr-CA'},
        {label: this.$tc('japanese'), value: 'jp-JP', disabled: true},
        {label: this.$tc('german'), value: 'de-DE', disabled: true}
      ]
    };
  },
  watch: {
    locale(item) {
      this.$i18n.locale = item.value;
    }
  },
  components: {
    'vue-header': Header,
    'vue-history': History,
    'vue-select': Select
  }
};
</script>
