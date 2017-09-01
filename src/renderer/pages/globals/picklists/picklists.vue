<template>
  <main style='overflow-y: auto'>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
    <vue-accordion id='picklists'>
      <li slot='accordion-items' v-for='(picklist, index) of picklists' :key='index' :aria-expanded='expanded[index]'>
        <div class='accordion-item-title' @click='toggle(index)'>
          {{picklist.title}}
        </div>
        <ul class='accordion-item-content'>
          <li v-for='(item, itemIndex) of picklist.content' :key='itemIndex'>
            <vue-input type='checkbox' :id='`${picklist.title}-${itemIndex}`' :label='item.valuedecode' @input='updatePicklist($event, item)' :value='item.status === "enabled" ? true : false'></vue-input>
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
import {mapState, mapGetters} from 'vuex';

export default {
  name: 'Picklists',
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
    expanded() {
      return this.picklists.map(() => false);
    }
  },
  methods: {
    toggle(index) {
      this.expanded = this.expanded.map((item, itemIndex) => {
        return index === itemIndex ?
          !item : this.autocollapse ?
            false : item;
      });
    },
    updatePicklist(event, item) {
      this.$store.dispatch('picklists/updatePicklistItem', {
        id: item._id,
        item: Object.assign({}, item, {status: event ? 'disabled' : 'enabled'})
      });
    }
  },
  beforeCreate() {
    this.$store.commit('loading');
  },
  created() {
    this.$store.commit('ready');
  },
  components: {
    'vue-accordion': Accordion,
    'vue-input': Input,
    'vue-progress': Progress
  }
};
</script>

<style>
#picklists .accordion-item-content > li {
  margin-left: 2rem;
  list-style: none;
}
</style>
