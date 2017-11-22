<docs>
## Pagination

Used to page lists or rows of items

### Values

#### Props

- id (String): the id of the parent
- label (String, required): the label
- options (Array): the possible page sizes
- message (String): the string to display
- pageSize (Number, required): the current pagesize
- offset (Number, required): the offset from 0
- count (Number, required): the total number of items
- onChangeSize (Function, default = emit('sizeChange')): cb for changing page size
- onPage (Function, default = emit('pageChange')): cb for changing page

#### Data

- size (Number): the size of the page

</docs>

<template>
  <div class='pagination f-container f-end f-cross-center'>
    <span>{{label}}:</span>
    <select :value='pageSize' @input='onChangeSize($event.target.value)'>
      <option disabled value=''>{{label}}</option>
      <option v-for='(option, index) of options' :key='index'>
        {{option}}
      </option>
    </select>
    <vue-icon icon='chevron_left' :label='$t("pageleft")' @click.native='onPage(-1)' :id='`${id}-page-left`' position='left' :disabled='offset === 0'></vue-icon>
    <span>{{message}}</span>
    <vue-icon icon='chevron_right' :label='$t("pageright")' @click.native='onPage(1)' :id='`${id}-page-right`' position='left' :disabled='(offset + 1) * pageSize >= count'></vue-icon>
  </div>
</template>

<script>
import Icon from '@/components/icon/icon.vue';

export default {
  name: 'Pagination',
  props: {
    id: {
      type: String,
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => [1, 5, 10, 20]
    },
    message: {
      type: String,
    },
    pageSize: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    onChangeSize: {
      type: Function,
      default(size) {
        this.$emit('sizeChange', Number(size));
      }
    },
    onPage: {
      type: Function,
      default(page) {
        this.$emit('pageChange', this.offset + page);
      }
    }
  },
  data() {
    return {
      size: this.pageSize
    };
  },
  components: {
    'vue-icon': Icon
  }
};
</script>

<style>
@import '../../assets/css/colors.css';

.pagination {
  padding: 10px 20px;
  border-top: 1px solid var(--divider);
}

.pagination > span:first-child {
  padding-right: 5px;
}
</style>