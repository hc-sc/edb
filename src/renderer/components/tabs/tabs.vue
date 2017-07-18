<template>
  <div class='tabs'>
    <slot name='tabs-links'>
      <ul class='tabs-list'>
        <li v-for='(tab, index) of tabs' :key='index' class='tabs-item'>
          <a :id='`${id}-tab-${index}`' :aria-selected='selected[index]' tabindex='0' :href='`#${id}-`' @click='select(index)'>{{tab.label}}</a>
        </li>
      </ul>
    </slot>
    <slot name='tabs-panels'>
      <div :aria-hidden='!selected[index]' :aria-labelledby='`${id}-tab-${index}`' v-for='(tab, index) of tabs' :key='index' class='tabs-panel'>
        <div>{{tab.panel}}</div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    id: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: this.tabs.map((item, index) => index === 0 ? true : false)
    };
  },
  methods: {
    select(index) {
      this.selected = this.selected.map((item, selectIndex) => selectIndex === index ? true : false);
    }
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/colors.css';

.tabs {
  box-shadow: var(--depth-1);
}

.tabs-list {
  display: flex;
  justify-content: space-around;
  text-align: center;
  width: 100%;
  background-color: inherit;
  border-bottom: 1px solid var(--divider);
  flex-wrap: wrap;
}

ul.tabs-list {
  list-style: none;
}

.tabs-item {
  outline: none;
  display: inline-block;
  line-height: 2.5rem;
  text-transform: uppercase;
  flex-grow: 1;
}

.tabs-item > a {
  outline: none;
  padding: 0 7px 0 5px;
  border-bottom: 2px solid transparent;
  display: block;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  color: var(--primary-text-light);
  overflow: hidden;
  text-overflow: ellipsis;
  transition: .2s var(--fast-out-linear-in);
}

.tabs-item > a[aria-selected] {
  border-bottom: 2px solid var(--primary-color);
  transition: .2s var(--linear-out-slot-in);
}

.tabs-panel {
  display: block;
}

.tabs-panel[aria-hidden] {
  display: none;
}
</style>
