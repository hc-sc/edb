<template>
  <div>
    <vue-dialog ref='dialog' id='validation' type='confirm'></vue-dialog>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{title}}
      <vue-nav id='submission-nav' slot='subheader' :navs='pageNodes'></vue-nav>
      <div slot='right'>
        <vue-icon icon='check' id='validate' @click.native='validate' :label='$t("VALIDATE")' position='left'></vue-icon>
        <vue-icon icon='archive' id='package' @click.native='packageSubmission' :label='$t("PACKAGE")' position='left'></vue-icon>
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
import ValidationErrors from '@/pages/submissions/validation-errors.vue';
import {mapState} from 'vuex';
import {BackendService} from '@/store/backend.service.js';
import {bus} from '@/plugins/plugin-event-bus.js';

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
      return await BackendService.validateGhsts()
      .then(result => {
        this.$store.commit('ready');
        bus.$emit('addSnackbar', {message: this.$t('VALIDATION_SUCCESS')});
      })
      .catch(err => {
        console.log(err);
        // NOTE: that vast majority of schema errors stem from the required
        // 'emptynode' property expected on TOC nodes, but there is no concensus
        // on whether this node needs to be in the schema, so filter them out
        let errors = err.filter(error => {
          return !(error.params && error.params.missingProperty === 'emptynode');
        });
        this.$store.commit('ready');
        bus.$emit('addSnackbar', {message: this.$t('VALIDATION_ERROR')});

        // let $dialog = this.$refs['dialog'];
        // $dialog.$set($dialog, 'component', ValidationErrors);
        // this.$nextTick(() => {

        //   $dialog.show()
        //   .then(() => {
        //     $dialog.close();
        //   });
        // });
      });
    },

    async packageSubmission() {
      this.validate()
      .then(() => {
        this.$store.commit('loading');
        BackendService.packageGhsts()
        .then(result => {
          this.$store.commit('ready');
          this.$nextTick(() => {
            this.$snackbar.show({message: `${this.$t('PACKAGE_SUCCESS')} ${result.data}`});
            this.$router.push('/dossiers');
          });
        })
        .catch(err => {
          this.$store.commit('ready');
          this.$nextTick(() => {
            this.$snackbar.show({message: this.$t('PACKAGE_ERROR')});
            console.error(err);
          });
        });
      })
      .catch(() => {
        // validation failed
      });
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
