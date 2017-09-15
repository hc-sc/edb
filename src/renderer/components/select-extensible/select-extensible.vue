<docs>
## Select Extensible

Allows for extending the collection of options in a select listbox.

### Values

#### Props

- all of the same as Select
- onAdd (Function): defines what to do when adding
- typeName (String): the string describing what type it is

#### Data

- newValue (String): the encoded value
- newValueDecode (String): the value that will be displayed
- adding (Boolean): if they are currently adding a new value

### Methods

- toggleAdd(): allows for adding
- clear(): clears the adding fields

### Slots

- add-fields: overrides the add fields

</docs>

<template>
  <div class='select-extensible'>
    <div class='f-container f-middle'>
      <vue-select @input='$emit("input", $event)' :value='value' class='flex' :id='id' :label='label' :options='options' :displayValue='displayValue' :matchValue='matchValue'></vue-select>
      <vue-icon id='`${id}-add`' :label='$t("add")' icon='add' @click.native='toggleAdd' v-if='!adding' position='left'></vue-icon>
      <vue-icon id='`${id}-clear`' :label='$t("clear")' icon='clear' @click.native='toggleAdd' v-else position='left'></vue-icon>
    </div>
    <div class='f-container f-middle' v-show='adding'>
      <slot name='add-fields'>
        <vue-input id='value' :label='$tc("value")' v-model='newValue'></vue-input>
        <span class='spacer'></span>
        <vue-input id='valuedecode' :label='$tc("valuedecode")' v-model='newValueDecode' :max='255'></vue-input>
        <vue-button display='flat' @click.native='onAdd()'>add</vue-button>
      </slot>
    </div>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Icon from '@/components/icon/icon.vue';
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
    typeName: {
      type: String
    },
    onAdd: {
      type: Function,
      default() {
        this.$store.dispatch('picklists/createPicklistItem', {
          TYPE_NAME: this.typeName,
          value: this.newValue,
          valuedecode: this.newValueDecode,
          isExt: true
        });
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
    },
    matchValue: {
      type: Function
    },
    getItems: {
      type: Function
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
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
    'vue-icon': Icon,
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