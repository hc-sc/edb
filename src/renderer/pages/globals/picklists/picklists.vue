<template>
  <main style='overflow-y: auto'>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-accordion id='picklists'>
      <li slot='accordion-items' v-for='(picklist, index) of picklists' :key='index'>
        <button type='button' class='accordion-item-title'  @click='toggle(index)' :aria-expanded='expanded[index]'>
          <vue-toolbar color='none'>
            <span slot='left'>
              <slot name='left'>&gt;</slot>
            </span>
            {{picklist.title}}
            <span slot='right'>
              <slot name='right'></slot>
            </span>
          </vue-toolbar>
        </button>
        <ul class='accordion-item-content'>
          <li v-for='(item, itemIndex) of picklist.content' :key='itemIndex'>
            {{item.value}} - {{item.valuedecode}}
            <!-- <vue-input type='checkbox' :id='`${picklist.title}-${itemIndex}`' :label='item.valuedecode' @input='updatePicklist($event, item)' :value='item.status === "enabled" ? true : false' :tabindex='expanded[index] ? 0 : -2'></vue-input> -->
          </li>
        </ul>
      </li>
    </vue-accordion>
    </template>
  </main>
</template>

<script>
import Accordion from '@/components/accordion/accordion.vue';
import Input from '@/components/input/input.vue';
import Progress from '@/components/progress/progress.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import {mapState, mapGetters} from 'vuex';

export default {
  name: 'Picklists',
  data() {
    return {
      expanded: []
    };
  },
  computed: {
    ...mapState(['loading']),
    ...mapGetters('picklists', ['all']),
    picklists() {
      return this.all == null || !Array.isArray(this.all) ?
        [] : this.all.map(picklist => {
          return {
            title: picklist[0] ? this.$t(picklist[0].TYPE_NAME) : 'undefined',
            content: picklist
          };
        });
    },
  },
  methods: {
    toggle(index) {
      this.expanded = this.expanded.map((item, itemIndex) => {
        return index === itemIndex ?
          !item : false;
      });
    },
    isTabbable(index) {
      return !this.expanded[index];
    },
    updatePicklist() {
      // this.$store.dispatch('picklists/updatePicklistItem', {
      //   id: item._id,
      //   item: Object.assign({}, item, {status: event ? 'disabled' : 'enabled'})
      // });
    }
  },
  beforeCreate() {
    this.$store.commit('loading');
  },
  created() {
    this.expanded = this.picklists.map(() => false);
    this.$store.commit('ready');
  },
  components: {
    'vue-accordion': Accordion,
    'vue-input': Input,
    'vue-progress': Progress,
    'vue-toolbar': Toolbar
  }
};
</script>

<style>
#picklists .accordion-item-content > li {
  list-style: none;
  padding: 10px 20px;;
}
</style>
