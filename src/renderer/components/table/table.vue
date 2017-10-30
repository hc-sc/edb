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
<div class='table' :class='{selectable, sortable, pageable, filterable}' @changeOffset='changeOffset'>
  <div>
    <vue-toolbar v-show='!searching'>
      <span>
        {{title}}
        <span v-if='required'> *</span>
      </span>
      <span slot='right'>
        <!-- <vue-icon id='`${id}-filter`' :label='$t("filter")' v-if='filterable' icon='filter_list' @click.native='addFilter'></vue-icon> -->
        <vue-icon :id='`${id}-search`' :label='$t("search")' icon='search' @click.native='search' position='left'></vue-icon>
        <vue-icon :id='`${id}-add`' :label='$t("add")' v-if='addable' icon='add' @click.native='onAdd' position='left'></vue-icon>
      </span>
    </vue-toolbar>
    <div class='search-toolbar' role='toolbar' v-show='searching' :aria-controls='id'>
      <vue-input class='search-input' :id='`${id}-search-input`' type='text' :label='$t("search")' v-model='searchTerm' ref='searchInput'></vue-input>
      <vue-icon :id='`${id}-clear`' :label='$t("clear")' icon='clear' @click.native='clearSearch' position='left'></vue-icon>
      </span>
    </div>
    <template>
      <div class='table-filter'>
        <div class='f-container f-middle' v-for='(filter, index) of filters' :key='index'>
          <vue-select :id='`${id}-filter-select-${index}`' :label='$tc("title")' :options='["any", ...headers]' :displayValue='displayHeader' v-model='filters[index].prop'></vue-select>
          <span class='f-gap'></span>
          <vue-input type='text' :id='`${id}-filter-text-${index}`' :label='$tc("filter")' v-model='filters[index].value'></vue-input>
          <vue-icon :id='`${id}-filter-clear-${index}`' :label='$t("clear")' icon='clear' @click.native='deleteFilter(index)' position='left'></vue-icon>
        </div>
      </div>
      <div class='table-wrapper'>
        <table class='table-table' :id='id'>
          <thead>
            <tr @sort='sort'>
              <th v-if='deletable' class='icon-cell'></th>
              <th v-if='editable' class='icon-cell'></th>
              <th v-if='viewable' class='icon-cell'></th>
              <th v-for='(header, index) of compHeaders' :key='header' @click='sort(index)' :class='[sortBy === headerKeys[index] ? "selected" : "", {desc}]'>
                {{displayHeader(header)}}
                <span class='sort-icon'>
                  <i class='material-icons'>arrow_downward</i>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(row, index) of pagedRows' :key='index'  @select='select'>
              <td v-if='deletable' class='icon-cell'>
                <vue-icon :id='`${id}-row-${index}-delete`' icon='delete' :label='$t("delete")' @click.native='onDelete(row.__index)' :disabled='!row.deletable' position='right'></vue-icon>
              </td>
              <td v-if='editable' class='icon-cell'>
                <vue-icon :id='`${id}-row-${index}-edit`' icon='forward' :label='$t("status")' @click.native='onEdit(row.__index)' :disabled='!row.editable' position='right'></vue-icon>
              </td>
              <td v-if='viewable' class='icon-cell'>
                <vue-icon :id='`${id}-row-${index}-view`' icon='visibility' :label='$t("view")' @click.native='onView(row.__index)' :disabled='!row.viewable' position='right'></vue-icon>
              </td>
              <td v-for='(header, headerIndex) of headerKeys' :key='headerIndex' @click='onSelect(row.__index)'>{{row[header]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <vue-pagination :count='count' :pageSize='pageSize' :offset='offset' :label='$t("rows")' @pageChange='changeOffset' @sizeChange='changeSize' :message='message'></vue-pagination>
    </template>
  </div>
  <span v-if='!loading && (rows == null || rows.length === 0) && required' :class='{"error-text": required}'>{{required ? $t('requireoneitem') : $t('noitems')}}</span>
</div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Card from '@/components/card/card.vue';
import Chips from '@/components/chips/chips.vue';
import Icon from '@/components/icon/icon.vue';
import Input from '@/components/input/input.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import Select from '@/components/select/select.vue';
import Pagination from '@/components/pagination/pagination.vue';
import Progress from '@/components/progress/progress.vue';
import moment from 'moment';
import {mapGetters} from 'vuex';
import {BackendService} from '@/store/backend.service.js';
import {sortByLocale, isStringMatch} from '@/services/utils.service.js';

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
        if (this.addable) this.$emit('add', {id: this.id});
      }
    },
    selectable: {
      type: Boolean,
      default: true
    },
    onSelect: {
      type: Function,
      default(index) {
        if (this.selectable && this.isSelectable(this.rows[index])) {
          this.$emit('select', index);
        }
      }
    },
    isSelectable: {
      type: Function,
      default() {
        return true;
      }
    },
    deletable: {
      type: Boolean,
      default: true
    },
    onDelete: {
      type: Function,
      default(index) {
        if (this.deletable && this.isDeletable(this.rows[index])) this.$emit('action', {
          type: 'delete',
          index,
          value: this.items[index]
        });
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
      default(index) {
        if (this.editable && this.isEditable(this.rows[index])) {
          this.$emit('action', {
            type: 'edit',
            index,
            value: this.items[index]
          });
        }
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
      default(index) {
        if (this.viewable && this.isViewable(this.rows[index])) {
          this.$emit('action', {
            type: 'view',
            index,
            value: this.items[index]
          });
        }
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
      default() {
        return this.items;
      }
    },
    displayHeader: {
      type: Function,
      default(value) {
        return value.label || value;
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
    initialSortBy: {
      type: String,
    },
    initialDesc: {
      type: Boolean
    },
    pageable: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rows: [],
      searchTerm: '',
      searching: false,
      filters: [],
      offset: 0,
      pageSize: 5,
      sortBy: undefined,
      desc: false,
      loading: true,
    };
  },
  computed: {
    ...mapGetters('picklists', ['getPicklistItem']),

    compHeaders() {
      return this.headers.map(header => {
        return header.name || header;
      });
    },

    headerKeys() {
      return this.headers.map(header => {
        return header.key || header.name || header;
      });
    },

    filteredRows() {
      if (this.searchTerm && this.searchTerm.length >=2) {
        return this.rows.filter(row => {
          for (let key in row) {
            if (typeof row[key] === 'string' && isStringMatch(row[key], this.searchTerm)) {
              return true;
            }
          }
          return false;
        });
      }
      else return this.rows.slice();
    },

    pagedRows() {
      return sortByLocale(this.filteredRows, this.desc, this.sortBy).slice(
        this.offset * this.pageSize, (this.offset + 1) * this.pageSize
      );
    },

    count() {
      return this.filteredRows.length;
    },

    message() {
      let lowRow = this.offset * this.pageSize + 1;
      lowRow = this.count === 0 ? 0 : lowRow;
      return `${lowRow} - ${Math.min((this.offset + 1) * this.pageSize, this.count)} of ${this.count}`;
    },
  },
  methods: {
    changeOffset(offset) {
      if (offset < 0 || offset * this.pageSize >= this.count) return;
      this.offset = offset;
    },

    changeSize(size) {
      this.pageSize = size;
    },

    select(index) {
      if (this.selectable) {
        this.onSelect(index);
      }
    },

    sort(index) {
      let header = this.headerKeys[index];
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

    search() {
      this.searching = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },

    clearSearch() {
      this.searchTerm = '';
      this.searching = false;
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
          // we can pass either a string or an object as headers
          // if it's a string, just use it as the key and header
          // if it's an object, need to use:
          // the 'key' prop is used for value retrieval from items
          // the 'name' prop is used with displayHeader to control it's look,
          // or as both if 'key' is not present
          const key = header.key || header.name || header;

          // if the header is a string, use that as the prop
          if (typeof header === 'string') {
            cellData = row[key];
          }

          // if it's not a string, need to retrieve the value from DB
          else {
            const value = row[key];

            // get matching picklist item from store
            if (header.url === 'picklist') {
              let item = this.getPicklistItem(value);
              if (item != null) {
                cellData = item.valuedecode;
              }

              // fallback
              else {
                cellData = undefined;
              }
            }

            // get matching app data item
            else if ('url' in header) {
              try {
                result = await BackendService.searchAppData(header.url, {_id: value});
                if (result[0] && 'valuedecode' in result[0]) {
                  cellData = result[0]['valuedecode'];
                }

                // fallback
                else {
                  cellData = undefined;
                }
              }
              catch(err) {
                cellData = undefined;
              }
            }

            // if there's no URL, just use whatever is at row[key]
            else {
              cellData = value;
            }
          }

          if (cellData && cellData.constructor === Object) cellData = null;
          if (Array.isArray(cellData)) cellData = cellData.join(', ');

          // replace ISO dates with more human readable versions
          let date = moment(cellData, moment.ISO_8601, true);
          if (date._isValid) cellData = date.format('YYYY-MM-DD');

          // MUST add these keys to allow for CSS and parent handling of actions
          mappedRow.selected = row.selected;
          mappedRow.deletable = this.isDeletable(row);
          mappedRow.editable = this.isEditable(row);
          mappedRow.viewable = this.isViewable(row);

          // with the index, we can easily configure deleting
          mappedRow.__index = index;

          mappedRow[key] = cellData;
        }

        return mappedRow;
      }));
    }
  },
  async created() {
    this.rows = await this.mapProjection(this.headers, await this.getItems());
    this.loading = false;
    this.sortBy = this.initialSortBy || this.compHeaders[0];
    this.desc = this.initialDesc || false;
  },

  watch: {
    async items() {
      this.rows = await this.mapProjection(this.headers, await this.getItems());
    }
  },

  components: {
    'vue-button': Button,
    'vue-card': Card,
    'vue-chips': Chips,
    'vue-icon': Icon,
    'vue-input': Input,
    'vue-toolbar': Toolbar,
    'vue-select': Select,
    'vue-pagination': Pagination,
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
  margin-bottom: 12px;
}

.table > div {
  box-shadow: var(--depth-1);
}

.table + .table {
  margin-top: 15px;
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

.table .sort-icon .material-icons {
  font-size: .9rem;
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
  padding: 0;
}

.table td.icon-cell {
  max-width: 30px;
}

.table .search-toolbar {
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>