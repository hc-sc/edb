<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-table :title='$t("RECEIVERS")' id='receivers' required addable
      @add='addReceiver($event)'></vue-table>
      <vue-table v-if='receivers && receivers.length' :title='$t("SENDERS")' id='senders' required addable @add='addSender($event)'></vue-table>
      <p v-if='receivers && receivers.length && selectedReceiver'>{{$t('SELECT_TO_BEGIN')}}</p>
      <p v-else>{{$t('ADD_TO_BEGIN')}}</p>
      <div class='bottom-float'>
        <vue-icon fab @click.native='save("receivers")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
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
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'SendersReceivers',
  mixins: [model],
  data() {
    return {
      receivers: [],
      senders: [],
      selectedReceiver: null,
      model: this.getEmptyModel('receiver')
    };
  },
  methods: {
    addReceiver() {
      this.showFormDialog('receiver')
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        this.$dialog.close();
      });
    },
    addSender(event) {
      this.showFormDialog('sender');
    },
    getComponent(name) {
      return name === 'receiver' ? Receiver : Sender;
    }
  },
  async created() {
    let recs = await BackendService.getGhsts();
    console.log(recs);
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