<template>
  <div class='page' id='contactperson' ref='contactperson'>
    <vue-input id='title' :label='$t("title")' v-model='model.title'></vue-input>
    <vue-input id='first-name' :label='$t("firstname")' v-model='model.firstname'></vue-input>
    <vue-input id='last-name' :label='$t("lastname")' v-model='model.lastname'></vue-input>
    <vue-input id='phone' :label='$t("phone")' v-model='model.phone'></vue-input>
    <vue-input id='email' :label='$t("email")' v-model='model.email'></vue-input>
    <vue-input id='mobile' :label='$t("mobile")' v-model='model.mobile'></vue-input>
    <vue-input id='fax' :label='$t("fax")' v-model='model.fax'></vue-input>
    <vue-input id='organization' :label='$t("organization")' v-model='model.organization'></vue-input>
    <vue-input id='department' :label='$t("department")'></vue-input>
  </div>
</template>

<script>
import Dialog from '@/components/dialog/dialog.vue';
import Input from '@/components/input/input.vue';

export default {
  name: 'Contacts',
  data() {
    return {
      model: {
        ...getEmptyModal()
      }
    };
  },
  components: {
    'vue-dialog': Dialog,
    'vue-input': Input
  }
};

function getEmptyModal() {
  return {
    title: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    mobile: '',
    fax: '',
    organization: '',
    department: ''
  };
}
</script>