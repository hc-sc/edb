<template>
  <div class='page-node'>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{$tc('setting', 2)}}
    </vue-header>
    <main class='pane'>
      <vue-select id='language' :label='$tc("language", 1)' v-model='locale' :options='languages' required></vue-select>
      <vue-input id='pidprefix' :label='$t("PID_PREFIX")' v-model='pidprefix' disabled required></vue-input>
      <!-- <div class=' flex flex-row'>
        <vue-button type='button' @click.native='selectFolder("packagelocation")'>{{$t('PACKAGE_LOCATION')}}</vue-button>
        <vue-input id='packagelocation' :label='$t("FILE_PATH")' v-model='packagelocation'></vue-input>
      </div> -->
    </main>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Input from '@/components/input/input.vue';
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import Select from '@/components/select/select.vue';
import {navigation} from '@/mixins/navigation.js';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'Settings',
  mixins: [navigation],
  data() {
    return {
      pidprefix: 'ghsts',
      packagelocation: '',
      locale: this.$i18n.locale,
      languages: [
        {label: 'English', value: 'en-CA'},
        {label: 'Francais', value: 'fr-CA', disabled: true},
        {label: 'Deutsch', value: 'de-DE', disabled: true}
      ]
    };
  },
  methods: {
    selectFolder(item) {
      BackendService.callMethod('file', 'selectFolder')
      .then(result => {

      })
      .catch(err => {
        console.error(err);
      });
    }
  },
  watch: {
    locale(item) {
      this.$i18n.locale = item.value;
    }
  },
  components: {
    'vue-button': Button,
    'vue-input': Input,
    'vue-header': Header,
    'vue-history': History,
    'vue-select': Select
  }
};
</script>
