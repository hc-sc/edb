<template>
  <main style='overflow-y: auto'>
    <h2>Picklists</h2>
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
  </main>
</template>

<script>
import Accordion from '@/components/accordion/accordion.vue';
import Input from '@/components/input/input.vue';
import {mapGetters} from 'vuex';

export default {
  name: 'Picklists',
  computed: {
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
  components: {
    'vue-accordion': Accordion,
    'vue-input': Input
  }
};
</script>

<style>
#picklists .accordion-item-content > li {
  margin-left: 2rem;
  list-style: none;
}
</style>
