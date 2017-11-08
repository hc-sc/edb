<docs>
## Tooltip

A hovering element used to give extra information about an element, such as an icon or abbreviation.

### Values

#### Props

- id (String, required): the id
- label (String, required): the descriptive text
- position (String, default = 'bottom'): the location of the tooltip in relation to the wrapped element

### Slots

- default: the injected element/component

</docs>

<template>
  <span class='tooltip-wrapper'>
    <slot class='tooltip' :aria-labelledby='`${id}-tooltip-label`'></slot>
    <div role='tooltip' :id='`${id}-tooltip-label`' :class='[position]'>{{label}}</div>
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
    },
    position: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value);
      }
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
  display: none;
  z-index: 100000;
  transform: scale(0);
  background-color: #555;
  color: white;
  font-size: .8rem;
  border-radius: 5px;
  padding: 5px;
  line-height: normal;
  transition: var(--out);
  text-align: center;
}

[role=tooltip].left {
  top: 0;
  left: -200%;
}

[role=tooltip].right {
  right: -200%;
  top: 0;
}

[role=tooltip].top {
  top: -100%;
}

[role=tooltip].bottom {
  bottom: -50%;
}

button:hover + [role=tooltip],
button:focus + [role=tooltip] {
  display: inline-block;
  transform: scale(1);
  transition: var(--in);
}
</style>