<docs>
## Table

The table is used to display grid-like and/or tabular data. You can provide an array of items, or provide a function to get the data.

### Values

#### Props

- addable (Boolean, default = false): if an add button should be displayed
- displayHeader (Function, default = header.label || header): controls how to display the header, for instance a translation function, or retrieving a property from an object
- filterable (Boolean, default = true): allows for filtering of data
- getItems(Function): if defined will override items and retrieves rows from the given function
- header (Array, default = []): array of header columns
- id (String, required): the id
- items (Array, default = []): the rows
- onAdd (Function, default = $emit('add', {id: this.id}))
- onSelect(Function, default = $emit('select', index)): callback for select
- pageable (Boolean, default = true): if you can page the data
- selectable (Boolean, default = true): emits an event on select
- sortable (Boolean, default = true): allows for sorting of data
- title (String, required): the title of the table

#### Data

- filters (Array, default = []): the filters to apply
- offset (Number, default = 0): the page offset
- pageSize (Number, default = 5): the number of rows to display per page
- sortBy (String, default = this.headers[0]): the column to sort by
- desc (Boolean, default = false): if the sorted rows should be applied reverse
- loading (Boolean, default = true): if the getItems function is in progress

#### Computed

- compHeaders (Array<String>): converts headers (which may be objects or strings), into just strings for use as table headers
- count (Number): the total number of records
- queryResults (Array): converts the given items (either by calling the getItems function or by providing them via props), into an array of rows
- sortedRows (Array): sorts the rows via some function
- projectedRows (Array): converts the items provided by queryResults into base data (i.e. converts Dates to human readable formats, replaces database ID's with their values, etc.)
- rows (Array): the rows provided to the table with given page/offset values
- page (String): the text string of page number, offset, and count

### Methods

- addFilter(): adds a new empty filter
- changeOffset(offset: Number): changes the page
- deleteFilter(index: Number): deletes the filter at an index
- select(index: Number): if selectable, calls onSelect
- sort(header: String): sets sortBy if necessary and clears the offset

</docs>

<template>
  <vue-card class='table' :class='{selectable, sortable, pageable, filterable}' @select='select' @sort='sort' @changeOffset='changeOffset'>
    <vue-toolbar>
      {{title}}
      <span slot='right'>
        <vue-icon id='`${id}-filter`' :label='$t("filter")' v-if='filterable' icon='filter_list' @click.native='addFilter'></vue-icon>
        <vue-icon id='`${id}-add`' :label='$t("add")' v-if='addable' icon='add' @click.native='onAdd' position='left'></vue-icon>
      </span>
    </vue-toolbar>
    <vue-progress v-if='loading'></vue-progress>
    <template v-else>
      <div class='table-filter'>
        <div class='f-container f-middle' v-for='(filter, index) of filters' :key='index'>
          <vue-select :id='`${id}-filter-select-${index}`' :label='$tc("title")' :options='["any", ...headers]' :displayValue='displayHeader' v-model='filters[index].prop'></vue-select>
          <span class='f-gap'></span>
          <vue-input type='text' :id='`${id}-filter-text-${index}`' :label='$tc("filter")' v-model='filters[index].value'></vue-input>
          <vue-icon id='`${id}-filter-clear-${index}`' :label='$t("clear")' icon='clear' @click.native='deleteFilter(index)' position='left'></vue-icon>
        </div>
      </div>
      <div class='table-wrapper'>
        <table class='table-table' v-if='!loading && rows && rows.length'>
          <thead>
            <tr>
              <th v-for='header of compHeaders' :key='header' @click='sort(header)' :class='[sortBy === header ? "selected" : "", {desc}]'>
                {{displayHeader(header)}}
                <span class='sort-icon'>↓</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(row, index) of rows' :key='index'>
              <td v-for='(header, headerIndex) of headers' :key='headerIndex' @click='onSelect(index)'>{{row[header]}}</td>
            </tr>
          </tbody>
        </table>
        <p v-else-if='!loading'>No results!</p>
        <vue-progress v-else></vue-progress>
      </div>
      <div v-if='pageable && rows && rows.length' class='table-pagination f-container f-middle'>
        <vue-select :id='`${id}-pagesize`' label='Page Size' :options='["1", "5", "10", "20"]' v-model='pageSize'></vue-select>
        <span @click='changeOffset(offset - 1)' :disabled='offset === 0'>
          <i class='material-icons'>chevron_left</i>
        </span>
        <span class='page'>{{page}}</span>
        <span @click='changeOffset(offset + 1)' :disabled='(this.offset + 1) * this.pageSize >= this.count'>
          <i class='material-icons'>chevron_right</i>
        </span>
      </div>
    </template>
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
import moment from 'moment';
import {mapGetters} from 'vuex';
import {BackendService} from '@/store/backend.service.js';
import {sortByLocale, matchFilter} from '@/services/utils.service.js';

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
    onAdd: {
      type: Function,
      default() {
        this.$emit('add', {id: this.id});
      }
    },
    selectable: {
      type: Boolean,
      default: true
    },
    onSelect: {
      type: Function,
      default(index) {
        this.$emit('select', index);
      }
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
      pageSize: 5,
      sortBy: this.headers[0],
      desc: false,
      loading: true,
    };
  },
  computed: {
    compHeaders() {
      return this.headers.map(header => {
        if (typeof header === 'string') {
          return header;
        }
        else if ('name' in header) {
          return header.name || header;
        }
      });
    },
    page() {
      return `${this.offset * this.pageSize + 1} - ${Math.min((this.offset + 1) * this.pageSize, this.count)} of ${this.count}`;
    },
    ...mapGetters('picklists', ['getPicklistItem'])
  },

  // REMEMBER: async function automatically wrap their return in a Promise
  // for computed properties in Vue, need to use vue-async-computed for Promises
  // if you're okay to just pass on the promise, you don't need to await
  // if you can't call a method/property  without first having data, use await
  asyncComputed: {
    async count() {
      return (await this.queryResults).length;
    },
    async queryResults() {
      return this.items;
    },
    async rows() {
      let mappedRows = await this.mapProjection(this.headers, this.queryResults);
      return mappedRows;
    }
  },
  methods: {
    changeOffset(offset) {
      if (offset < 0 || offset * this.pageSize >= this.count) return;
      this.offset = offset;
    },
    select(index) {
      if (this.selectable) {
        this.onSelect(index);
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
    },

    /**
     * mapProjection allows for mapping a collection of rows into new ones with
     * only the desired headers. It can also replace cell data with a desired
     * value
     * @param {Array} projection - the desired columns. If it is
     * just a string, will use as is. If it's an object of the form
     * {id: String, url: String}, will replace the cell data with the
     * result of the database query for the id at the url table, or
     * fallback to the id
     * @param {Array} rows - the rows to be mapped
     * @returns {Array} - the altered rows
     */
    async mapProjection(projection, rows) {
      // map the rows to match the projected headers.
      // replace table ID's with corresponding values
      return await Promise.all(rows.map(async row => {
        let mappedRow = {};
        let query, result, cellData;

        for (let header of projection) {
          // if the header is a string, use that as the prop
          if (typeof header === 'string') {
            cellData = row[header];
          }

          // if it's not a string, need to retrieve the value from DB
          else {
            const id = row[header.name];

            // get matching picklist item from store
            if (header.url === 'picklist') {
              let item = this.getPicklistItem(id);
              if (item != null) {
                cellData = item.valuedecode;
              }

              // fallback if no matching id
              else {
                cellData = row[header.name];
              }
            }

            // get matching app data item
            else {
              query = {
                url: header.url,
                data: query
              };

              result = await BackendService.searchAppData(query);
              if (result && 'valuedecode' in result) {
                cellData = result['valuedecode'];
              }

              // fallback
              else {
                cellData = row[header.id];
              }
            }
          }

          // replace ISO dates with more human readable versions
          let date = moment(cellData, moment.ISO_8601, true);
          if (date._isValid) cellData = date.format('YYY-MM-DD');

          mappedRow[header] = cellData;
        }

        return mappedRow;
      }));
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