<template>
  <span class='tooltip-wrapper'>
    <slot class='tooltip' :aria-labelledby='`${id}-tooltip-label`'></slot>
    <div role='tooltip' :id='`${id}-tooltip-label`'>{{label}}</div>
  </span>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
@import '../../assets/css/animations.css';
@import '../../assets/css/colors.css';

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

[role=tooltip] {
  position: absolute;
  opacity: 0;
  z-index: 1000;
  transform: scale(0);
  background-color: #555;
  color: var(--background-color);
  font-size: .8rem;
  border-radius: 5px;
  padding: 5px;
  line-height: normal;
  transition: var(--out);
  text-align: center;
  margin-bottom: -5px;
}

button:hover + [role=tooltip],
button:focus + [role=tooltip] {
  opacity: 1;
  transform: scale(1);
  transition: var(--in);
}
</style>