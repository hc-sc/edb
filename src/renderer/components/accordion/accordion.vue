<docs>
## Accordion

Presents multiple panels of content. If no JS is present, the content panels default to all open. Otherwise you can configure to show panels, either one at a time or toggling each individually. There are slots to transclude custom panel formats, or you can pass an array of objects with title and content properties.

### Values

#### Props

- autocollapse (default = true): whether other open tabs should close when another is opened
- contentProp: (String, default = 'content'): which property should be used for the content from the `items` array
- id (String, required): the id, used to link a title to content for accessibility
- items (Array, default = []): an array of items to be included
- titleProp (String, default = 'title'): which property should be used for the title from the `items` array

#### Data

- expanded (Array): which accordion tabs are open

### Methods

- toggle(index: Number): opens the tab at the appropriate index

### Slots

- accordion-items: replaces the list of tabs
- accordion-item-title: replaces the tab title
- accordion-item-content: replaces the tab content

</docs>

<template>
  <ul class='accordion' :id='id'>
    <slot name='accordion-items'>
      <li class='accordion-item' v-for='(item, index) of items' :key='index' :aria-expanded='expanded[index]'>
        <button type='button' class='accordion-item-title'  @click='toggle(index)'>
          <vue-toolbar color='none'>
            <span slot='left'>
              <slot name='left'></slot>
            </span>
            <span slot='middle'>
              {{item[titleProp]}}
            </span>
            <span slot='right'>
              <slot name='right'></slot>
            </span>
          </vue-toolbar>
        </button>
        <div class='accordion-item-content' :id='`${id}-${index}`'>
          <slot name='accordion-item-content'>
            <span>{{item[contentProp]}}</span>
          </slot>
        </div>
      </li>
    </slot>
  </ul>
</template>

<script>
import Toolbar from '@/components/toolbar/toolbar.vue';

export default {
  name: 'Accordion',
  props: {
    id: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    autocollapse: {
      type: Boolean,
      default: true
    },
    titleProp: {
      type: String,
      default: 'title'
    },
    contentProp: {
      type: String,
      default: 'content'
    }
  },
  data() {
    return {
      expanded: this.items.map(() => true)
    };
  },
  methods: {
    toggle(index) {
      this.expanded = this.expanded.map((item, itemIndex) => {
        return index === itemIndex ?
          !item : (this.autocollapse ? false : item);
      });
    }
  },
  created() {
    this.expanded = this.items.map(() => false);
  },
  components: {
    'vue-toolbar': Toolbar
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.accordion {
  display: block;
  width: 100%;
  list-style-type: none;
  border: none;
  box-shadow: var(--depth-1);
}

.accordion-item-title {
  width: 100%;
  text-align: left;
  display: block;
  cursor: pointer;
  min-height: 3rem;
  line-height: 3rem;
  padding: 0 1rem;
  background-color: inherit;
  border: none;
  border-bottom: 1px solid var(--divider);
}

.accordion-item-content {
  display: block;
  opacity: 0;
  overflow: hidden;
  border-bottom: 1px solid var(--divider);
  transition: .2s var(--fast-out-slow-in);
  max-height: 0;
  transition: max-height .2s ease, opacity .1s .05s ease;
}

.accordion-item-title {
  outline: none;
}

.accordion-item-title:hover {
  background-color: rgba(0, 0, 0, .1);
}

.accordion-item-title:focus {
  background-color: var(--primary-color);
  color: var(--primary-text);
}

.accordion-item-title span:first-child {
  transition: transform .2s ease;
}

.accordion-item-title[aria-expanded] span:first-child {
  transform: rotate(90deg);
}

.accordion-item-title[aria-expanded] + .accordion-item-content {
  opacity: 1;
  max-height: none;
}

</style>