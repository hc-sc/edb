<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>

      <vue-table :title='$t("receivers")' id='receivers' required addable
      @add='addReceiver' :headers='[{key: "toLegalEntityId", name: "receiver", url: "legalentity"}, "shortname", "role"]' :displayHeader='displayTranslation' :items='model' @select='selectReceiver' @action='handleAction($event, model)'></vue-table>

      <vue-table v-if='selectedReceiver' :title='$t("senders")' id='senders' required addable @add='addSender($event)' :items='selectedReceiver._senders' :headers='[{key: "toLegalEntityId", name: "sender", url: "legalentity"}, {key: "_shortname", name: "shortname"}, "companycontactregulatoryrole", "remark"]' :displayHeader='displayTranslation' @select='selectSender($event)' @action='handleAction($event, selectedReceiver._senders)'></vue-table>

      <p v-if='model && model.length === 0 && selectedReceiver == null'>{{$t('ADD_RECEIVER')}}</p>
      <p v-else-if='model && model.length > 0 && selectedReceiver == null'>{{$t('SELECT_RECEIVER')}}</p>
      <p v-else-if='selectedReceiver == null'>{{$t('ADD_TO_BEGIN')}}</p>
      <div class='bottom-float'>
        <vue-icon fab @click.native='save' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
        <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
        </vue-icon>
      </div>
    </template>
  </main>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Progress from '@/components/progress/progress.vue';
import Receiver from '@/pages/submissions/senders-receivers/receiver.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import Sender from '@/pages/submissions/senders-receivers/sender.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';
import {mapState, mapGetters, mapActions} from 'vuex';
import {cloneDeep} from 'lodash';

export default {
  name: 'SendersReceivers',
  mixins: [model],
  data() {
    return {
      model: [],
      receivers: [],
      ghstsReceivers: [],
      selectedReceiver: null,
    };
  },
  computed: {
    ...mapState('app', ['ghsts']),
    ...mapGetters('app', ['senders'])
  },
  methods: {
    ...mapActions('app', ['updateCurrentGhsts']),

    addReceiver() {
      this.showFormDialog('receiver')
      .then(async (receiver) => {
        this.$set(receiver, '_senders', []);
        this.model.push(receiver);
      })
      .catch(() => {
        // dialog rejected (cancelled), no problems
      })
      .then(() => this.$dialog.close());
    },

    selectReceiver(index) {
      this.selectedReceiver = this.model[index];
    },

    addSender() {
      this.showFormDialog('sender')
      .then(sender => {
        this.selectedReceiver._senders.push(sender);
      }, () => {
        // dialog rejected (cancelled), no problems
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => this.$dialog.close());
    },

    selectSender(index) {
      this.showFormDialog('sender', this.selectedReceiver._senders[index])
      .then(sender => {
        this.$set(this.selectedReceiver._senders, index, sender);
      }, () => {
        // dialog rejected (cancelled), no problems
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => this.$dialog.close());
    },

    getComponent(name) {
      return name === 'receiver' ? Receiver : Sender;
    },

    save() {
      let newGhsts = cloneDeep(this.ghsts);
      newGhsts._receiver = this.model.map(receiver => {
        return {
          receiver: receiver._id,
          sender: receiver._senders.map(sender => sender._id)
        };
      });

      this.updateCurrentGhsts(newGhsts)
      .then(async () => {
        this.updateCurrentRecord(await this.initReceivers());
        this.mapStateToModel();
        this.showMessage(this.$t('UPDATE_SUCCESS'));
      })
      .catch(err => {
        this.showMessage(this.$t('ERROR'));
        console.error(err);
      });
    },

    // used to convert the ghsts structure of
    // _receivers: {
    //   receiver: <id>
    //   sender: [<id>]
    // }
    // into
    // this.receivers: {
    //   ...receiverData
    //   _senders: [<id>]
    // }
    // so we can populate the table data and manage senders.
    // This is cloned to be able to revert.
    async initReceivers() {
      let receivers = await Promise.all(this.ghsts._receiver.map(async receiver => {
        let obj = {};
        obj = (await BackendService.getAppData('receiver', receiver.receiver))[0];
        obj._senders = await this.initSenders(receiver.sender);
        return obj;
      }));
      return receivers;
    },

    async initSenders(senderIds) {
      return await BackendService.searchAppData('sender', {where: senderIds});
    }
  },
  watch: {
    // need to remove the selectedReceiver if was deleted
    model() {
      if (this.selectedReceiver != null &&
          !this.model.find(receiver => receiver._id === this.selectedReceiver._id
        )) {
        this.selectedReceiver = null;
      }
    }
  },
  beforeCreate() {
    this.$store.commit('loading');
  },
  async created() {
    this.updateCurrentUrl('receiver');
    this.resetForm();
    this.updateCurrentRecord(await this.initReceivers());
    this.mapStateToModel();
    this.$store.commit('ready');
  },
  components: {
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-progress': Progress,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table
  }
};
</script>