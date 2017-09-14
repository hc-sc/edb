<template>
  <div class='page' id='contactperson' ref='contactperson'>
    <vue-input id='title' :label='$t("title")' v-model='model.title' :max='255'></vue-input>
    <vue-input id='first-name' :label='$t("firstname")' v-model='model.firstname' :max='255'></vue-input>
    <vue-input id='last-name' :label='$t("lastname")' v-model='model.lastname' :max='255'></vue-input>
    <vue-input id='phone' :label='$t("phone")' v-model='model.phone' :max='255'></vue-input>
    <vue-input id='email' :label='$t("email")' v-model='model.email' :max='255'></vue-input>
    <vue-input id='mobile' :label='$t("mobile")' v-model='model.mobile' :max='255'></vue-input>
    <vue-input id='fax' :label='$t("fax")' v-model='model.fax' :max='255'></vue-input>
    <vue-input id='organisation' :label='$t("ORGANISATION")' v-model='model.organisation' :max='255'></vue-input>
    <vue-input id='department' :label='$t("department")' v-model='model.department' :max='255'></vue-input>
  </div>
</template>

<script>
import Input from '@/components/input/input.vue';

export default {
  name: 'Contacts',
  data() {
    return {
      model: {
        ...this.getEmptyModel()
      }
    };
  },
  methods: {
    getEmptyModel() {
      return {
        title: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        mobile: '',
        fax: '',
        organisation: '',
        department: ''
      };
    }
  },
  components: {
    'vue-input': Input
  }
};
</script>