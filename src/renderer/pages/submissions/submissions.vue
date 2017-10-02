<template>
  <div>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{title}}
      <vue-nav id='submission-nav' slot='subheader' :navs='pageNodes'></vue-nav>
    </vue-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import Nav from '@/components/nav/nav.vue';
import {mapState} from 'vuex';

export default {
  name: 'Submissions',
  computed: {
    ...mapState({
      title: state => state.app.dossier.dossierdescriptiontitle
    }),
    pageNodes: function() {
      return [
        {
          label: this.$tc('submission', 1),
          path: '/submission'
        },
        {
          label: `${this.$tc('sender', 2)}/${this.$tc('receiver', 2)}`,
          path: '/submission/senders-receivers'
        },
        {
          label: this.$tc('dossier', 1),
          path: '/submission/dossier'
        },
        {
          label: this.$tc('file', 2),
          path: '/submission/files'
        },
        {
          label: this.$tc('document', 2), path: '/submission/documents'
        },
        {
          label: this.$t('toc'),
          path: '/submission/toc'
        },
      ];
    }
  },
  components: {
    'vue-header': Header,
    'vue-history': History,
    'vue-nav': Nav
  }
};
</script>
