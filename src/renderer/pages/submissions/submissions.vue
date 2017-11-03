<template>
  <div>
    <vue-dialog ref='dialog' id='validation' type='confirm'>
      <span slot='title'>{{$t('VALIDATION_ERROR')}}</span>
      <ul class='validation-errors'>
        <li v-for='(error, index) of errors' :key='index'>{{error}}</li>
      </ul>
    </vue-dialog>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{title}}
      <vue-nav id='submission-nav' slot='subheader' :navs='pageNodes'></vue-nav>
      <div slot='right'>
        <vue-icon icon='check' id='validate' @click.native='validateSubmission' :label='$t("VALIDATE")' position='left'></vue-icon>
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
import {mapState} from 'vuex';
import {BackendService} from '@/store/backend.service.js';
import {bus} from '@/plugins/plugin-event-bus.js';

export default {
  name: 'Submissions',
  data() {
    return {
      errors: []
    };
  },
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
    validate() {
      this.$store.commit('loading');
      return BackendService.validateGhsts();
    },

    validateSubmission() {
      this.validate()
      .then(() => {
        this.$store.commit('ready');
        bus.$emit('addSnackbar', {message: this.$t('VALIDATION_SUCCESS')});
      })
      .catch(err => {
        // NOTE: that vast majority of schema errors stem from the required
        // 'emptynode' property expected on TOC nodes, but there is no concensus
        // on whether this node needs to be in the schema, so filter them out
        this.errors = [];
        if (Array.isArray(err)) {
          err.reduce((errors, error) => {
            if (!(error.params && error.params.missingProperty === 'emptynode')) {
              errors.push(this.mapErrorMessage(error));
            }
            return errors;
          }, this.errors);
        }
        else this.errors = [err.message];

        this.$store.commit('ready');
        bus.$emit('addSnackbar', {message: this.$t('VALIDATION_ERROR')});

        let $dialog = this.$refs['dialog'];
        this.$nextTick(() => {
          $dialog.show({})
          .then(() => {

          })
          .catch(() => {

          })
          .then(() => {
            $dialog.close();
          });
        });
      });
    },

    async packageSubmission() {
      this.validate()
      .then(() => {
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
        this.$store.commit('ready');
        bus.$emit('addSnackbar', {message: this.$t('VALIDATION_ERROR')});
      });
    },

    mapErrorMessage(error) {
      let node = error.dataPath.split('.').pop();

      // if the node is 'value', it's a basic message, not attributed to a node
      node = node === 'value' ? '' : node;

      // if there's an index, store it and remove it
      // since we only capture the index number, need to also remove []
      let match = indexRegExp.exec(node);
      let index = '';
      if (match != null) {
        index = match[0].substr(1, match[0].length - 2);
        node = node.replace(indexRegExp, '');
      }

      return `${node}${index.length ? ('[' + index + ']') : ' '}${node.length ? ' - ' : ' '}${error.message.charAt(0).toUpperCase() + error.message.slice(1)}`;
    }
  },
  components: {
    'vue-header': Header,
    'vue-history': History,
    'vue-icon': Icon,
    'vue-nav': Nav
  }
};

const indexRegExp = /(\[[0-9]+\])$/i;

</script>

<style>
.validation-errors {
  list-style: none;
}

.validation-errors > li {
  padding: 5px 10px;
}
</style>
