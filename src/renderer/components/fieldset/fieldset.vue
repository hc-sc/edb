<template>
  <fieldset class='fieldset'>
    <legend class='fieldset-legend h4'>{{legend}}</legend>
    <div class='fieldset-items'>
      <slot></slot>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'Fieldset',
  props: {
    legend: {
      type: String
    }
  }
};
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/shadows.css';

.fieldset {
  border: none;
  outline: none;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: var(--depth-1);
}

.fieldset-items {
  padding: 5px;
}

.fieldset-legend {
  padding: 0 1rem;
  width: 100%;
  background: var(--primary-color);
  color: var(--primary-text);
}
</style>
