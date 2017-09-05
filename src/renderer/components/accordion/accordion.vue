<docs>
## Accordion

SOMETHING HERE

Presents multiple panels of content. If no JS is present, the content panels default to all open. Otherwise you can configure to show panels, either one at a time or toggling each individually. There are slots to transclude custom panel formats, or you can pass an array of objects with title and content properties.

</docs>

<template>
  <ul class='accordion' :id='id'>
    <slot name='accordion-items'>
      <li class='accordion-item' v-for='(item, index) of items' :key='index' :aria-expanded='expanded[index]'>
        <div class='accordion-item-title'  @click='toggle(index)'>
          <slot name='accordion-item-title'>
            {{item[titleProp]}}
          </slot>
        </div>
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
      expanded: this.items.map(() => false)
    };
  },
  methods: {
    toggle(index) {
      this.expanded = this.expanded.map((item, itemIndex) => {
        return index === itemIndex ?
          !item : this.autocollapse ?
            false : item;
      });
    }
  },
  mounted() {
    const nodes = this.$el.querySelectorAll('.accordion-item');
    for (let i = 0; i < nodes.length; ++i) {
      const item = nodes[i];
      const content = item.querySelector('.accordion-item-content > span');
      const height = content.getBoundingClientRect().height;
      const style = document.createElement('style');
      style.textContent = `
        .js #${this.id + '-' + i} {
          height: 0;
          opacity: .2;
        }

        .js [aria-expanded] #${this.id + '-' + i} {
          height: ${height + 5}px;
          opacity: 1;
        }
      `;

      item.insertBefore(style, item.firstChild);
    }
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
  display: block;
  cursor: pointer;
  min-height: 3rem;
  line-height: 3rem;
  padding: 0 1rem;
  background-color: inherit;
  border-bottom: 1px solid var(--divider);
}

.accordion-item-content {
  display: block;
  overflow: hidden;
  border-bottom: 1px solid var(--divider);
  transition: .2s var(--fast-out-slow-in);
}

.js .accordion-item-content > span {
  margin: 2rem;
}

.js .accordion-item:last-of-type .accordion-item-content {
  border: none;
}

.js .accordion-item:last-of-type:not([aria-expanded]) .accordion-item-title, .js .accordion-item:not([aria-expanded]) .accordion-item-content {
  border: none;
}
</style>
