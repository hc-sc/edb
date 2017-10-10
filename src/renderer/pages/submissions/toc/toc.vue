<template>
  <main class='pane'>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <vue-tree :tree='toc'></vue-tree>
      <div class='bottom-float'>
        <vue-icon fab @click.native='save("toc")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
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
import Tree from '@/components/tree/tree.vue';
import {model} from '@/mixins/model.js';
import {BackendService} from '@/store/backend.service.js';

export default {
  name: 'SendersReceivers',
  mixins: [model],
  data() {
    return {
      toc: {label: 'TOC', children: []}
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
    let toc = await BackendService.getGhsts({url: '/toc'});
    console.log(toc);
  },
  components: {
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-select': Select,
    'vue-select-extensible': SelectExtensible,
    'vue-split-pane': SplitPane,
    'vue-switch': Switch,
    'vue-table': Table,
    'vue-tree': Tree
  }
};
</script>