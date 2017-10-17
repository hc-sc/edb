<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-table :title='$t("receivers")' id='receivers' required addable
      @add='addReceiver' :headers='[{name: "toLegalEntityId", url: "legalentity"}, "shortname", "role"]' :displayHeader='displayTranslation' :items='receiversData' @select='selectReceiver'></vue-table>
      <vue-table v-if='selectedReceiver' :title='$t("sender")' id='senders' required addable @add='addSender($event)' :items='sendersData' :headers='[{key: "toLegalEntityId", name: "legalentity", url: "legalentity"}, "shortname", "companycontactregulatoryrole", "remark"]' :displayHeader='displayTranslation' @select='selectSender($event)' @action='handleAction($event, sendersData)'></vue-table>
      <p v-if='receiversData && receiversData.length && selectedReceiver == null'>{{$t('SELECT_TO_BEGIN')}}</p>
      <p v-else-if='selectedReceiver == null'>{{$t('ADD_TO_BEGIN')}}</p>
      <div class='bottom-float'>
        <vue-icon fab @click.native='saveReceiver' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
        <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
        </vue-icon>
      </div>
    </template>
  </main>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Receiver from '@/pages/submissions/senders-receivers/receiver.vue';
import Select from '@/components/select/select.vue';
import SelectExtensible from '@/components/select-extensible/select-extensible.vue';
import Sender from '@/pages/submissions/senders-receivers/sender.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import Switch from '@/components/switch/switch.vue';
import Table from '@/components/table/table.vue';
import {model} from '@/mixins/model.js';
import {mapGetters} from 'vuex';

export default {
  name: 'SendersReceivers',
  mixins: [model],
  data() {
    return {
      receiversData: [],
      sendersData: [],
      selectedReceiver: null,
      model: this.getEmptyModel('receiver')
    };
  },
  computed: {
    ...mapGetters('app', ['receivers', 'senders']),
  },
  methods: {
    addReceiver() {
      this.showFormDialog('receiver')
      .then(async ({receiver}) => {
        this.receiversData.push(receiver);
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => this.$dialog.close());
    },
    selectReceiver(index) {
      this.selectedReceiver = this.receiversData[index];
    },
    addSender() {
      this.showFormDialog('sender')
      .then(({sender}) => {
        this.sendersData.push(sender);
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => this.$dialog.close());
    },
    selectSender(index) {
      this.showFormDialog('sender')
      .then(({sender}) => {
        this.$set(this.sendersData, index, sender);
      })
      .catch(err => {
        console.error(err);
      })
      .then(() => this.$dialog.close());
    },
    getComponent(name) {
      return name === 'receiver' ? Receiver : Sender;
    },
    saveReceiver() {
      console.log('saving');
    }
  },
  watch: {
    async selectedReceiver() {
      try {
        this.sendersData = [];
        // this.sendersData = await BackendService.getAppData('sender', {where: this.selectedReceiver['sender']});
      }
      catch(err) {
        console.log(err);
      }
    }
  },
  async created() {
    this.updateCurrentUrl('receiver');
    try {
      let ids = [];
      if (this.receivers && this.receivers.length) {
        ids = this.receivers.map(receiverData => receiverData.receiver);
      }
      if (ids && ids.length) {
        this.receiversData = this.getAppData('receiver', {where: ids});
      }
      console.log(this.receiversData);
      // this.updateCurrentRecord(this.mergeModelAndRecord(this.getEmptyModel('submission'), model));
      // this.mapStateToModel();
    }
    catch(err) {
      this.showMessage('ERROR');
    }
    this.$store.commit('ready');
  },
  components: {
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table
  }
};
</script>