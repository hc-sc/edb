<docs>
## Table

The table component acts as either a client side table, where rows are given as props, or as a server side table, where it is given a URL and the table communicates directly with the backend. There are various configuration options for allowing single or multiple select, display, pagination, filtering, etc. The items passed in as values or from some API should be normalize into objects of flat key-value pairs. The `header` prop is then used to control projections of the rows and order of the columns.
</docs>

<template>
  <div class='table' :class='{selectable, sortable, pageable, filterable}' @select='select' @sort='sort'  @changeOffset='changeOffset'>
    <vue-toolbar>{{title}}</vue-toolbar>
    <div class='table-filter'>
      <vue-button display='flat' @click.native='addFilter'>add filter</vue-button>
      <div class='table-filter-group' v-for='(filter, index) of filters' :key='index'>
        <vue-select :id='`${id}-filter-select-${index}`' label='Filter' :options='["all", ...headers]' v-model='filters[index].filter'></vue-select>
        <vue-input type='text' id='filter-text' label='Filter' v-model='filters[index].value'></vue-input>
        <span @click='deleteFilter(index)'>x</span>
      </div>
    </div>
    <div class='table-wrapper'>
      <table class='table-table' v-if='!loading && rows.length !== 0'>
        <thead>
          <tr>
            <th v-for='header of headers' :key='header' @click='sort(header)' :class='[sortColumn === header ? "selected" : "", {desc}]'>
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
    <div v-if='pageable && rows.length > 0' class='table-pagination'>
      <!--<vue-select :id='`${id}-pagesize`' label='Page Size' :options='["5", "10", "20"]' v-model='pageSize'></vue-select>-->
      <span @click='changeOffset(offset - 1)' :disabled='offset === 0'>«</span>
      <span class='page'>{{page}}</span>
      <span @click='changeOffset(offset + 1)' :disabled='offset === Math.floor(count / pageSize)'>»</span>
    </div>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Chips from '@/components/chips/chips.vue';
import Input from '@/components/input/input.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import Select from '@/components/select/select.vue';
import Progress from '@/components/progress/progress.vue';

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
    selectable: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    sortable: {
      type: Boolean,
      default: false
    },
    pageable: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    url: {
      type: String
    },
    displayHeader: {
      type: Function,
      default(value) {
        return this.$tc(value);
      }
    }
  },
  data() {
    return {
      filters: [],
      offset: 0,
      pageSize: 10,
      sortColumn: this.headers[0],
      desc: false,
      loading: false
    };
  },
  computed: {
    count() {
      return this.queryResults.length;
    },
    queryResults() {
      if (this.url) {
        this.loading = true;
        return this.backendService.get(this.url, {sortColumn: this.sortColumn})
        .then(results => {
          // should set count, offset, etc.
          this.rows = results;
          this.loading = false;
        });
      }
      else {
        return this.items.filter(() => {
          let match = true;
          // for (let filter of this.filters) {
          //   console.log(filter);
          //   const key = Object.keys(filter)[0];
          //   const values = Object.values(filter)[0];
          //   console.log(values);
          //   const isMatch = values.some(elem => {
          //     return elem.toString().toLowerCase() === item[key].toString().toLowerCase();
          //   });
          //   if (!isMatch) {
          //     match = false;
          //     break;
          //   }
          // }
          return match;
        })
        .sort((a, b) => {
          let comp;
          let x = a[this.sortColumn], y = b[this.sortColumn];
          if (!Number.isNaN(Number(x)) && !Number.isNaN(Number(y))) {
            comp = x - y;
          }
          else {
            comp = x.localeCompare(y);
          }
          return this.desc ? -comp : comp;
        });
      }
    },
    rows() {
      if (this.url) {
        return this.queryResults.slice();
      }
      else {
        return this.queryResults.slice(
          this.offset * this.pageSize, (this.offset + 1) * this.pageSize
        );
      }
    },
    page() {
      return `${this.offset * this.pageSize + 1} - ${Math.min((this.offset + 1) * this.pageSize, this.count)} of ${this.count}`;
    }
  },
  methods: {
    changeOffset(offset) {
      if (this.url) {
        if (offset < 0 || offset >= (Math.floor(this.count / this.pageSize) + 1)) return;
      }
      else {
        this.offset = offset;
      }
    },
    select(index) {
      if (this.selectable) this.$emit('select', index);
    },
    sort(header) {
      this.offset = 0;
      if (this.sortColumn === header) {
        this.desc = !this.desc;
      }
      else {
        this.sortColumn = header;
        this.desc = false;
      }
    },
    addFilter() {
      this.filters.push({filter: 'all', value: ''});
    },
    deleteFilter(index) {
      this.filters.splice(index, 1);
    }
  },
  created() {
    if (this.url) {
      this.backendService = require('@/services/backend.service.js');
    }
  },
  components: {
    'vue-button': Button,
    'vue-chips': Chips,
    'vue-input': Input,
    'vue-toolbar': Toolbar,
    'vue-select': Select,
    'vue-progress': Progress
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.table {
  border: none;
  outline: none;
  box-shadow: var(--depth-1);
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

.table.sortable thead tr:hover {
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

.table-pagination > span[disabled] {
  color: var(--disabled-color);
  cursor: not-allowed;
}

.table-filter-group {
   display: flex;
   flex-wrap: nowrap;
}

.table-filter-group > div {
  flex: 1;
}

.table-filter-group .select-wrapper {
  min-width: 200px;
}
</style>
