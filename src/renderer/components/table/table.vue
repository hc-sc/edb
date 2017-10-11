<docs>
## Table

The table is used to display grid-like and/or tabular data. You can provide an array of items, or provide a function to get the data.

### Values

#### Props

- addable (Boolean, default = false): if an add button should be displayed
- deletable(Boolean, default = false): if an item should display a delete icon
- onDelete(Function, default = $emit('action', {'delete', index}): emitted event
- displayHeader (Function, default = header.label || header): controls how to display the header, for instance a translation function, or retrieving a property from an object
- editable(Boolean, default = false): if an item should display an edit icon
- onEdit(Function, default = $emit('action', {'edit', index}): emitted event
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
- deletable(Boolean, default = false): if an item should display a view icon
- onDelete(Function, default = $emit('action', {'view', index}): emitted event

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
      <span v-if='required'> *</span>
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
              <th v-if='deletable' class='icon-cell'></th>
              <th v-if='editable' class='icon-cell'></th>
              <th v-if='viewable' class='icon-cell'></th>
              <th v-for='header of compHeaders' :key='header' @click='sort(header)' :class='[sortBy === header ? "selected" : "", {desc}]'>
                {{displayHeader(header)}}
                <span class='sort-icon'>↓</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(row, index) of rows' :key='index'>
              <td v-if='deletable' class='icon-cell'>
                <vue-icon :id='`${id}-row-${index}-delete`' icon='delete' :label='$t("delete")' @click.native='onDelete(row.index)' :disabled='row.deletable || false' position='right'></vue-icon>
              </td>
              <td v-if='editable' class='icon-cell'>
                <vue-icon :id='`${id}-row-${index}-edit`' icon='edit' :label='$t("edit")' @click.native='onEdit(row.index)' :disabled='!row.editable || false' position='right'></vue-icon>
              </td>
              <td v-if='viewable' class='icon-cell'>
                <vue-icon :id='`${id}-row-${index}-view`' icon='view' :label='$t("view")' @click.native='onView(row.index)' :disabled='!row.viewable || false'></vue-icon>
              </td>
              <td v-for='(header, headerIndex) of compHeaders' :key='headerIndex' @click='onSelect(row.index)'>{{row[header]}}</td>
            </tr>
          </tbody>
        </table>
        <p v-else-if='!loading'>
          <span v-if='required' :class='{"error-text": required}'>{{required ? $t('requireoneitem') : $t('noitems')}}</span>
        </p>
        <vue-progress v-else></vue-progress>
      </div>
      <div v-if='pageable && rows && rows.length' class='table-pagination f-container f-middle'>
        <vue-select :id='`${id}-pagesize`' label='Page Size' :options='["1", "5", "10", "20"]' v-model='pageSize'></vue-select>
        <vue-icon icon='chevron_left' :label='$t("pageleft")' :id='`${id}-pageleft`' @click.native='changeOffset(offset - 1)' :disabled='offset === 0'></vue-icon>
        <span class='page'>{{page}}</span>
        <vue-icon icon='chevron_right' :label='$t("pageright")' :id='`${id}-pageright`' @click.native='changeOffset(offset + 1)' :disabled='(this.offset + 1) * this.pageSize >= this.count'></vue-icon>
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
      default: false
    },
    sortable: {
      type: Boolean,
      default: true
    },
    pageable: {
      type: Boolean,
      default: false
    },
    deletable: {
      type: Boolean,
      default: true
    },
    onDelete: {
      type: Function,
      default(index) {
        this.$emit('action', {type: 'delete', index});
      }
    },
    isDeletable: {
      type: Function,
      default() {
        return true;
      }
    },
    editable: {
      type: Boolean,
      default: false
    },
    onEdit: {
      type: Function,
      default(value) {
        this.$emit('action', {type: 'edit', value});
      }
    },
    isEditable: {
      type: Function,
      default() {
        return true;
      }
    },
    viewable: {
      type: Boolean,
      default: false
    },
    onView: {
      type: Function,
      default(value) {
        this.$emit('action', {type: 'view', value});
      }
    },
    isViewable: {
      type: Function,
      default() {
        return true;
      }
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
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filters: [],
      offset: 0,
      pageSize: 5,

      // NOTE: this cannot be defined now. If it is, such as this.headers[0],
      // that value will be converted to a reactive object, screwing up the map
      // projection function!
      sortBy: undefined,
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
    count() {
      return this.queryResults.length;
    },
    queryResults() {
      return this.items;
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
    rows: {
      async get() {
        let tempRows = await this.mapProjection(this.headers, this.queryResults);

        tempRows = sortByLocale(tempRows.filter((item) => {
          let match = true;
          this.filters.filter(f => {
            return match && (match = (
              matchFilter(f, 'prop', 'value', item)
            ));
          });
          return match;
        }),
        this.desc,
        this.sortBy);

        // uncomment when ready for pagination
        // tempRows = tempRows.slice(
        //   this.offset * this.pageSize, (this.offset + 1) * this.pageSize
        // );

        return tempRows;
      },

      watch() {
        return [this.desc, this.sortBy, this.pageSize, this.offset, this.filters];
      }
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
     * while replacing cell data with other values, such as table IDs
     * @param {Array} projection - the desired columns. If it is
     * just a string, will use as is. If it's an object of the form
     * {name: String, url: String}, will replace the cell data with the
     * result of the database query for the name at the url table, or
     * fallback to the name. To enable control of actions, need to provide
     * some additional properties to the row so can be used to filter in the
     * parent
     * @param {Array} rows - the rows to be mapped
     * @returns {Array} - the altered rows
     */
    async mapProjection(projection, rows) {

      // map the rows to match the projected headers.
      // replace table ID's with corresponding values
      return Promise.all(rows.map(async (row, index) => {
        let mappedRow = {};
        let result, cellData;
        for (let header of projection) {
          // if the header is a string, use that as the prop
          if (typeof header === 'string') {
            cellData = row[header];
          }

          // if it's not a string, need to retrieve the value from DB
          else {
            const name = row[header.name];

            // get matching picklist item from store
            if (header.url === 'picklist') {
              let item = this.getPicklistItem(name);
              if (item != null) {
                cellData = item.valuedecode;
              }

              // fallback to original value
              else {
                cellData = name;
              }
            }

            // get matching app data item
            else {
              try {
                result = await BackendService.searchAppData(header.url, {_id: row[header.name]});
                console.log(result[0]);
                if (result[0] && 'valuedecode' in result[0]) {
                  cellData = result[0]['valuedecode'];
                }

                // fallback to original value
                else {
                  cellData = row[header.name];
                }
              }
              catch(err) {
                cellData = row[header.name];
              }
            }
          }

          if (cellData && cellData.constructor === Object) cellData = 'null';

          // replace ISO dates with more human readable versions
          let date = moment(cellData, moment.ISO_8601, true);
          if (date._isValid) cellData = date.format('YYYY-MM-DD');

          // MUST add these keys to allow for CSS and parent handling of actions
          mappedRow.selected = row.selected;
          mappedRow.deletable = row.deletable;
          mappedRow.editable = row.editable;
          mappedRow.viewable = row.viewable;

          // with the index, we can easily configure deleting
          mappedRow.index = index;

          mappedRow[typeof header === 'object' ? header.name : header] = cellData;
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
}

.table-table {
  border-collapse: collapse;
  border-spacing: 0;
  border: none;
  width: 100%;
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
  white-space: nowrap;
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

.table .icon-cell {
  width: 44px;
  padding: 0;
}
</style>