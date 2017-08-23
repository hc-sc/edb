<docs>
## Table

The table component acts as either a client side table, where rows are given as props, or as a server side table, where it is given a function that allows the table to retrieve and manage it's own data. There are various configuration options for allowing pagination, filtering, etc. The items passed in as values or from some API should be normalize into objects of flat key-value pairs. The `header` prop is then used to control projections of the rows and order of the columns, for example headers=['name', 'age'] will cause the 'name' and 'age' properties of the rows to be displayed, in that order.
</docs>

<template>
  <vue-card class='table' :class='{selectable, sortable, pageable, filterable}' @select='select' @sort='sort' @changeOffset='changeOffset'>
    <vue-toolbar>
      {{title}}
      <span slot='right'>
        <vue-icon id='`${id}-filter`' :label='$t("filter")' v-if='filterable' icon='filter_list' @click.native='addFilter'></vue-icon>
        <vue-icon id='`${id}-add`' :label='$t("add")' v-if='addable' icon='add' @click.native='addItem'></vue-icon>
      </span>
    </vue-toolbar>
    <div class='table-filter'>
      <div class='f-container f-middle' v-for='(filter, index) of filters' :key='index'>
        <vue-select :id='`${id}-filter-select-${index}`' :label='$tc("title")' :options='["any", ...headers]' :displayValue='displayHeader' v-model='filters[index].prop'></vue-select>
        <span class='f-gap'></span>
        <vue-input type='text' :id='`${id}-filter-text-${index}`' :label='$tc("filter")' v-model='filters[index].value'></vue-input>
        <vue-icon id='`${id}-filter-clear-${index}`' :label='$t("clear")' icon='clear' @click.native='deleteFilter(index)'></vue-icon>
      </div>
    </div>
    <div class='table-wrapper'>
      <table class='table-table' v-if='!loading && rows.length !== 0'>
        <thead>
          <tr>
            <th v-for='header of headers' :key='header' @click='sort(header)' :class='[sortBy === header ? "selected" : "", {desc}]'>
              {{displayHeader(header)}}
              <span class='sort-icon'>↓</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(row, index) of rows' :key='index'>
            <td v-for='(header, headerIndex) of headers' :key='headerIndex' @click='select(index)'>{{row[header]}}</td>
          </tr>
        </tbody>
      </table>
      <p v-else-if='!loading'>No results!</p>
      <vue-progress v-else></vue-progress>
    </div>
    <div v-if='pageable && rows.length > 0' class='table-pagination f-container f-middle'>
      <vue-select :id='`${id}-pagesize`' label='Page Size' :options='["1", "5", "10", "20"]' v-model='pageSize'></vue-select>
      <span @click='changeOffset(offset - 1)' :disabled='offset === 0'>
        <i class='material-icons'>chevron_left</i>
      </span>
      <span class='page'>{{page}}</span>
      <span @click='changeOffset(offset + 1)' :disabled='(this.offset + 1) * this.pageSize >= this.count'>
        <i class='material-icons'>chevron_right</i>
      </span>
    </div>
  </vue-card>
</template>

<script>
import Button from '@/components/button/button.vue';
import Card from '@/components/card/card.vue';
import Chips from '@/components/chips/chips.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import Select from '@/components/select/select.vue';
import Progress from '@/components/progress/progress.vue';
import {debounce, isEqual} from 'lodash';

export default {
  name: 'Table',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    addable: {
      type: Boolean,
      default: false
    },
    addItem: {
      type: Function,
      default() {
        this.$emit('addItem', {id: this.id});
      }
    },
    selectable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Boolean,
      default: true
    },
    pageable: {
      type: Boolean,
      default: true
    },
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    getItems: {
      type: Function,
    },
    displayHeader: {
      type: Function,
      default(value) {
        return value.label || value;
      }
    }
  },
  data() {
    return {
      filters: [],
      offset: 0,
      pageSize: 7,
      sortBy: this.headers[0],
      desc: false,
      loading: true,
    };
  },
  computed: {
    count() {
      return this.queryResults.length;
    },
    queryResults() {
      /* prop based tables use the data attributes to control which rows to show. fetch based tables use the getItems prop function to retrieve data and set the offset, count, sortBy, and desc fields */
      if (this.getItems) {
        this.loading = true;
        debounce(
          this.getItems({
            offset: this.offset,
            pageSize: this.pageSize,
            sortBy: this.sortBy,
            desc: this.desc
          })
          .then(({count, items}) => {
            this.count = count;
            this.rows = items;
            this.loading = false;
          })
          .catch(err => {
            console.error(err);
            // display normalized/translated error via snackbar
          }),
          300,
          {leading: true}
        );
      }
      else {
        return this.items.filter((item) => {
          let match = true;
          this.filters.filter(f => {
            return match && (match = (
              matchFilter(f, item)
            ));
          });
          return match;
        })
        .sort((a, b) => {
          let comp;
          let x = a[this.sortBy], y = b[this.sortBy];
          if (typeof x === 'object' || typeof y === 'object') {
            comp = isEqual(a, b);
          }
          else {
            if (!Number.isNaN(Number(x)) && !Number.isNaN(Number(y))) {
              comp = x - y;
            }
            else {
              comp = x.localeCompare(y);
            }
          }
          return this.desc ? -comp : comp;
        });
      }
    },
    rows() {
      return this.queryResults.slice(
        this.offset * this.pageSize, (this.offset + 1) * this.pageSize
      );
    },
    page() {
      return `${this.offset * this.pageSize + 1} - ${Math.min((this.offset + 1) * this.pageSize, this.count)} of ${this.count}`;
    }
  },
  methods: {
    changeOffset(offset) {
      if (offset < 0 || offset * this.pageSize >= this.count) return;
      this.offset = offset;
    },
    select(index) {
      if (this.selectable) {
        this.$emit('select', index);
      }
    },
    sort(header) {
      if (!this.sortable) return;
      this.offset = 0;
      if (this.sortBy === header) {
        this.desc = !this.desc;
      }
      else {
        this.sortBy = header;
        this.desc = false;
      }
    },
    addFilter() {
      this.filters.push({prop: '', value: ''});
    },
    deleteFilter(index) {
      this.filters.splice(index, 1);
    }
  },
  async created() {
    if (this.getItems) {
      this.items = await this.getItems();
    }
    this.loading = false;
  },
  components: {
    'vue-button': Button,
    'vue-card': Card,
    'vue-chips': Chips,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-toolbar': Toolbar,
    'vue-select': Select,
    'vue-progress': Progress
  }
};

function matchFilter(filter, item) {
  if (filter == null || filter.prop == null || filter.value == null || filter.prop === '') {
    return true;
  }
  else if (filter.prop === 'any') {
    if (filter.value === '') return true;
    let match = false;
    Object.entries(item).filter(entry => {
      return match || (match = (
        item[entry[0]].toString().toLowerCase().includes(filter.value.toString().toLowerCase())
      ));
    });
    return match;
  }
  else {
    return item[filter.prop].toString().toLowerCase().includes(filter.value.toString().toLowerCase());
  }
}
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.table {
  border: none;
  outline: none;
}

.table-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
}

.table-table {
  border-collapse: collapse;
  border-spacing: 0;
  border: none;
  width: 100%;
  overflow: hidden;
}

.table tbody tr {
  transition: .2s var(--fast-out-linear-in);
}

.table tbody tr:hover {
  background-color: var(--hover-color);
  transition: .2s var(--linear-out-slow-in);
}

.table.selectable tbody tr:hover {
  cursor: pointer;
}

.table.sortable thead th:hover {
  cursor: pointer;
}

.table th, .table td {
  text-align: left;
  padding: .5rem 1rem;
  border-bottom: 1px solid var(--divider);
}

.table th {
  font-size: .8rem;
  font-weight: 700;
  color: rgba(0, 0, 0, .54);
}

.table td {
  font-size: .9rem;
}

.table:not(.pageable) tr:last-child td {
  border-bottom: none;
}

.table .sort-icon {
  display: none;
}

.table.sortable .sort-icon {
  display: inline;
  opacity: 0;
}

.table.sortable th.selected .sort-icon {
  display: inline-block;
  opacity: 1;
  transform: rotate(0);
  transition: .1s var(--fast-out-slow-in);
}

.table.sortable th.selected.desc .sort-icon {
  transform: rotate(180deg);
  transition: .1s var(--fast-out-slow-in);
}

.table-pagination :not(.page) {
  cursor: pointer;
}

.table-pagination > span {
  display: inline-block;
  height: 100%;
  line-height: 100%;
}

.table-pagination > span[disabled] i {
  color: var(--disabled-color);
  cursor: not-allowed;
}
</style>
