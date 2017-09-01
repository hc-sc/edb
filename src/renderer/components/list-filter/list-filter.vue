<template>
  <div class='list-filter'>
    <div class='f-container f-cross-center filter'>
      <vue-input :id='`${id}-filter`' :label='label' v-model='searchTerm'></vue-input>
      <vue-icon id='clear' :label='$t("clear")' icon='clear' @click.native='clearSearch' position='left'></vue-icon>
    </div>
    <vue-list :selectable='selectable' :items='sortedItems' :displayValue='displayValue' @select='$emit("select", $event)'></vue-list>
  </div>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import List from '@/components/list/list.vue';
import {sortByLocale} from '@/services/utils.service.js';

export default {
  name: 'ListFilter',
  props: {
    id: {
      type: String
    },
    label: {
      type: String
    },
    items: {
      type: Array
    },
    selectable: {
      type: Boolean,
      default: false
    },
    onSelect: {
      type: Function,
      default(value) {
        if (this.selectable) this.$emit('select', value);
      }
    },
    displayValue: {
      type: Function
    },
    sortable: {
      type: Boolean,
      default: true
    },
    sortByArgs: {
      type: String | Array | Function
    }
  },
  data() {
    return {
      searchTerm: '',
      desc: false
    };
  },
  computed: {
    filteredItems() {
      if (this.items == null) return [];
      return this.items.filter(item => {
        let match = false;
        Object.keys(item).filter(key => {
          return match || (match = (item[key].toString().toLowerCase().includes(this.searchTerm.toLowerCase())));
        });
        return match;
      });
    },
    sortedItems() {
      if (this.sortable) return sortByLocale(this.filteredItems.slice(), this.desc, this.sortByArgs);
      else return this.filteredItems;
    }
  },
  methods: {
    clearSearch() {
      this.searchTerm = '';
    }
  },
  components: {
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-list': List
  }
};
</script>

<style>
.list-filter .filter {
  padding: 2px 0 2px 5px;
}
</style>