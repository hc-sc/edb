<template>
  <main>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-split-pane>
      <div slot='split-pane-1'>
        <vue-list-filter id='master-search' selectable @select='select' :items='senders' :displayValue='se => se.name' :label='$t("search")' sortByArgs='sender'></vue-list-filter>
      </div>
       <div slot='split-pane-2' class='pane'>
         <template v-if='senders && senders.length'>
          <h1>Senders</h1>
         </template>
         <template v-else>
           {{$t('noitems')}}
         </template>
      </div>
    </vue-split-pane>
    <div class='bottom-float'>
      <vue-icon fab @click.native='save("sender")' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
      <vue-icon fab id='add' :label='$t("add")' icon='add' position='top'></vue-icon>
      <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
      </vue-icon>
    </div>
  </main>
</template>

<script>
import Dialog from '@/components/dialog/dialog.vue';
import Icon from '@/components/icon/icon.vue';
import ListFilter from '@/components/list-filter/list-filter.vue';
import SplitPane from '@/components/split-pane/split-pane.vue';
import {mapState, mapGetters} from 'vuex';
import {model} from '@/mixins/model.js';

export default {
  name: 'Senders',
  mixins: [model],
  computed: {
    ...mapState('app', {
      senders(state) {
        return state.appRecords || [];
      }
    }),
    ...mapGetters('picklists', [

    ])
  },
  methods: {
    select() {}
  },
  async created() {
    await this.$store.dispatch('app/getAppDataAll', 'sender');
    this.select(this.senders[0]);
  },
  components: {
    'vue-dialog': Dialog,
    'vue-icon': Icon,
    'vue-list-filter': ListFilter,
    'vue-split-pane': SplitPane
  }
};
</script>
