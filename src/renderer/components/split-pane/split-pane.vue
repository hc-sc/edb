<template>
  <div :id='id' class='split-pane' :class='[direction]'>
    <template v-for='(n, index) of numPanes'>
      <div class='split-pane-item' :key='index'>
        <slot :name='`split-pane-${n}`'></slot>
      </div>
      <div v-if='n !== numPanes || direction === "column"' :key='`${index}-separator`' role='separator' :aria-orientation='direction === "row" ? "horizontal" : "vertical"' class='split-pane-divider' draggable @dragend='dragEnd($event)'></div>
      </template>
  </div>
</template>

<script>
export default {
  name: 'SplitPane',
  props: {
    id: {
      type: String
    },
    numPanes: {
      type: Number,
      default: 2
    },
    direction: {
      type: String,
      default: 'row',
      validator(value) {
        return ['row', 'column'].includes(value);
      }
    }
  },
  methods: {
    dragEnd(event) {
      const divider = event.target;
      const divStyle = window.getComputedStyle(divider);
      const divSpace = (this.direction === 'row' ? parseFloat(divStyle.width, 10) : parseFloat(divStyle.height, 10)) / 2;
      const prevPane = divider.previousElementSibling;
      const nextPane = divider.nextElementSibling;
      if (this.direction === 'row') {
        nextPane.style.flexBasis = nextPane.getBoundingClientRect().right - event.clientX - divSpace + 'px';
        prevPane.style.flexBasis = event.clientX - prevPane.getBoundingClientRect().left - divSpace + 'px';
      }
      else {
        if (nextPane) {
          nextPane.style.flexBasis = nextPane.getBoundingClientRect().bottom - event.clientY - divSpace + 'px';
        }
        prevPane.style.flexBasis = event.clientY - prevPane.getBoundingClientRect().top - divSpace + 'px';
      }
    }
  },
  beforeCreate() {
    if (!this.$options.components['vue-split-pane']) {
      this.$options.components['vue-split-pane'] = require('./split-pane.vue');
    }
  }
};
</script>

<style>
@import '../../assets/css/colors.css';

.split-pane {
  flex: 1;
  position: relative;
  display: flex;
  align-items: stretch;
}

.split-pane.column {
  flex-direction: column;
}

.split-pane-divider {
  background-color: var(--divider);
  border: none;
}

.split-pane-divider:hover {
  background-color: var(--primary-color);
}

.split-pane.row .split-pane-divider {
  display: inline-block;
  width: 5px;
  height: 100%;
  border-left: 2px solid white;
  border-right: 2px solid white;
}

.split-pane.column .split-pane-divider {
  display: block;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  height: 5px;
  width: 100%;
}

.js .split-pane.row .split-pane-divider {
  cursor: ew-resize;
}

.js .split-pane.column .split-pane-divider {
  cursor: ns-resize;
}

.split-pane.row .split-pane-item {
  display: inline-block;
  overflow-y: auto;
}

.split-pane-item {
  flex: 1;
}

.split-pane-item:last-child {
  flex: 2;
}
</style>
