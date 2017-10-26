<template>
  <div>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{title}}
      <vue-nav id='submission-nav' slot='subheader' :navs='pageNodes'></vue-nav>
      <div slot='right'>
        <vue-icon icon='check' id='validate' @click.native='validate' :label='$t("VALIDATE")' position='left'></vue-icon>
        <vue-icon icon='archive' id='package' @click.native='package' :label='$t("PACKAGE")' position='left'></vue-icon>
      </div>
    </vue-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import Icon from '@/components/icon/icon.vue';
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
          label: this.$t('submission'),
          path: '/submission'
        },
        {
          label: `${this.$t('senders')}/${this.$t('receivers')}`,
          path: '/submission/senders-receivers'
        },
        {
          label: this.$t('dossier'),
          path: '/submission/dossier'
        },
        {
          label: this.$t('product'),
          path: '/submission/product'
        },
        {
          label: this.$t('files'),
          path: '/submission/files'
        },
        {
          label: this.$t('documents'),
          path: '/submission/documents'
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
      this.$store.commit('loading');
      BackendService.validateGhsts()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        this.$snackbar.show({message: this.$tc('VALIDATION_ERROR')});
        console.error(err);
      })
      .then(() => this.$store.commit('ready'));
    },

    async package() {
      this.$store.commit('loading');
      BackendService.packageGhsts()
      .then(() => {
        this.$snackbar.show({message: this.$t('VALIDATION_SUCCESS')})
      })
      .catch(err => {
        this.$snackbar.show({message: this.$t('PACKAGE_ERROR')});
        console.error(err);
      })
      .then(() => this.$store.commit('ready'));
    }
  },
  components: {
    'vue-header': Header,
    'vue-history': History,
    'vue-icon': Icon,
    'vue-nav': Nav
  }
};
</script>
