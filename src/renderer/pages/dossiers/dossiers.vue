<template>
  <div>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{dossierTitle}}
    </vue-header>
    <router-link to='/submission'>Go to submission</router-link>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';

export default {
  name: 'Dossiers',
  computed: {
    dossierTitle() {
      return this.$i18n.tc('dossier', 2);
    }
  },
  components: {
    'vue-header': Header,
    'vue-history': History
  }
};
</script>
