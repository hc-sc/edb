<template>
  <div>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{title}}
      <vue-nav id='submission-nav' slot='subheader' :navs='pageNodes'></vue-nav>
      <div slot='right'>
        <i class='material-icons' @click='validate'>check</i>
        <i class='material-icons' @click='package'>archive</i>
      </div>
    </vue-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import Nav from '@/components/nav/nav.vue';
import {mapState} from 'vuex';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'Submissions',
  computed: {
    ...mapState({
      title: state => state.app.dossiertitle
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
          label: this.$tc('product', 1),
          path: '/submission/product'
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
  methods: {
    async validate() {
      try {
        let result = BackendService.validateGhsts();
      }
      catch(err) {
        console.log(err);
      }
    },
    async package() {
      try {
        let result = BackendService.packageGhsts();
      }
      catch(err) {
        console.log(err);
      }
    }
  },
  components: {
    'vue-header': Header,
    'vue-history': History,
    'vue-nav': Nav
  }
};
</script>
