<template>
  <div>
    <vue-header>
      {{title}}
      <span slot='actions'>
        <span>☰</span>
      </span>
      <vue-nav id='submission-nav' slot='subheader' :navs='pageNodes'></vue-nav>
    </vue-header>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Header from '@/components/header/header.vue';
import Nav from '@/components/nav/nav.vue';

export default {
  name: 'Submission',
  computed: {
    ...mapState({
      title: state => state.dossier.title || '!!!'
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
    'vue-nav': Nav
  }
};
</script>
