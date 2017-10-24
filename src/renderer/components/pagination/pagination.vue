<template>
  <div class='pagination f-container f-end'>
    {{label}}:
    <select :value='size' @input='onChangeSize($event.target.value)'>
      <option disabled value=''>{{label}}</option>
      <option v-for='(option, index) of options' :key='index'>
        {{option}}
      </option>
    </select>
    <vue-icon icon='chevron_left' :label='$t("pageleft")' @click.native='onPage(-1)' :id='`${id}-page-left`' position='left'></vue-icon>
    <span>{{message}}</span>
    <vue-icon icon='chevron_right' :label='$t("pageright")' @click.native='onPage(1)' :id='`${id}-page-right`' position='left'></vue-icon>
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
.pagination {
  padding: 5px 10px;
}
</style>