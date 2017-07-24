<template>
  <div class='select-extensible'>
    <div class='f-container f-middle'>
      <vue-select @input='$emit("input", $event)' :value='value' class='flex' :id='id' :label='label' :options='options' :displayValue='displayValue'></vue-select>
      <span @click='toggleAdd'>
        <i class='material-icons select-extensible-add' :class='{adding}'>add</i>
      </span>
    </div>
    <div class='f-container f-middle' v-show='adding'>
      <slot name='add-fields'>
        <vue-input id='value' :label='$tc("value")' v-model='newValue'></vue-input>
        <vue-input id='valuedecode' :label='$tc("valuedecode")' v-model='newValueDecode'></vue-input>
        <vue-button display='flat' @click.native='add(value)'>add</vue-button>
      </slot>
    </div>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Input from '@/components/input/input.vue';
import Select from '@/components/select/select.vue';

export default {
  name: 'SelectExtensible',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    add: {
      type: Function,
      default(value) {
        console.log('add new value', value);
      }
    },
    displayValue: {
      type: Function,
      default(value) {
        return value.label || value;
      }
    },
    value: {
      type: String | Object
    }
  },
  data() {
    return {
      newValue: '',
      newValueDecode: '',
      adding: false
    };
  },
  methods: {
    toggleAdd() {
      if (this.adding) {
        this.clear();
      }
      this.adding = !this.adding;
    },
    clear() {
      this.newValue = '';
      this.newValueDecode = '';
    }
  },
  components: {
    'vue-button': Button,
    'vue-input': Input,
    'vue-select': Select
  }
};
</script>

<style>
@import '../../assets/css/animations.css';

.select-extensible-add {
  transform: rotate(0deg);
  transition: var(--toggle);
}

.select-extensible-add.adding {
  transform: rotate(45deg);
  transition: var(--toggle);
}
</style>
