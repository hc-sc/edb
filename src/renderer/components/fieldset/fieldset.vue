<docs>
## Fieldset

Used to wrap forms (or nested form models) in a fieldset

### Values

#### Props

- legend (String): the legend of the fieldset

### Slots

- default: allows for field injection

</docs>

<template>
  <vue-card>
    <fieldset class='fieldset'>
      <legend class='h4 fieldset-legend'>{{legend}}</legend>
      <div class='fieldset-items'>
        <slot></slot>
      </div>
    </fieldset>
  </vue-card>
</template>

<script>
import Card from '@/components/card/card.vue';

export default {
  name: 'Fieldset',
  props: {
    legend: {
      type: String
    }
  },
  components: {
    'vue-card': Card
  }
};
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/shadows.css';

.fieldset {
  border: none;
  outline: none;
}

.fieldset .fieldset-items {
  padding: 5px;
}

.fieldset .fieldset-legend {
  padding: 0 1rem;
  width: 100%;
  background: var(--primary-color);
  color: var(--primary-text);
}
</style>
