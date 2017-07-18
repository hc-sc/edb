<docs>
## Drawer

A side panel used for navigation. Can be configured using be fullscreen, and also whether it should be on the left or right, overlay, push, or collapse a component. For compatibility, the default is collapse, so that browsers without JS will initialize correctly. Both 'push' and 'collapse' require a sibling ID to control. DO NOT use both side=collapse and fullscreen=true, this will cause a lot of jank.
</docs>

<template>
  <aside class='drawer-cloak' :class='[{showing, fullscreen}, side]' @click.self='close'>
    <div class='drawer'>
      <div class='drawer-close'>
        <slot name='close'>
          <vue-button  @click.native='close' display='flat'>close</vue-button>
        </slot>
      </div>
      <slot name='drawer'>
        <nav class='drawer-items'>
          <slot name='header'></slot>
          <slot name='items'>
            <a href='#' class='drawer-item' v-for='(item, index) of items' :key='index'>
              {{item}}
            </a>
          </slot>
        </nav>
      </slot>
    </div>
  </aside>
</template>

<script>
/** Code modified from
* https://material-components-web.appspot.com/drawer/persistent-drawer.html
*/
import Button from '@/components/button/button.vue';

export default {
  name: 'Drawer',
  props: {
    id: {
      type: String,
      required: true
    },
    side: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right'].includes(value);
      }
    },
    siblingId: {
      type: String
    },
    display: {
      type: String,
      default: 'overlay',
      validator(value) {
        return ['overlay', 'push', 'collapse'].includes(value);
      }
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    showing: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    select(index) {
      this.$emit('select', index);
    }
  },
  mounted() {
    const content = this.$el.firstChild.getBoundingClientRect();
    const width = content.width;
    const style = document.createElement('style');
    style.textContent = `
      .drawer-cloak .drawer {
        transform: translateX(${this.side === 'left' ? '-' : ''}${width}px);
        transition: .2s ease;
      }
    `;
    if (this.display === 'push' && this.siblingId != null) {
      style.textContent += `
        #${this.siblingId}.push {
          transform: translateX(${this.side === 'left' ? '-' : ''}${width}px) !important;
          transition: .2s ease;
        }
      `;
    }
    this.$el.insertBefore(style, this.$el.firstChild);
  },
  components: {
    'vue-button': Button
  }
};
</script>

<style>
@import '../../assets/css/animations.css';
@import '../../assets/css/colors.css';

.drawer-cloak {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, .12);
  opacity: 0;
  visibility: hidden;
  z-index: 25;
}

.drawer-cloak.showing {
  opacity: 1;
  visibility: visible;
}

.drawer {
  height: 100%;
  min-width: 250px;
  background-color: white;
}

.drawer-cloak.right .drawer {
  position: absolute;
  right: 0;
}

.drawer-cloak.showing .drawer {
  transform: translateX(0);
}

.drawer-items {
  line-height: 3rem;
  list-style-type: none;
}

.drawer-item {
  width: 100%;
  color: var(--light-text);
  display: block;
  padding: 0 16px;
  outline: none;
  text-decoration: none;
  font-size: .875rem;
  font-weight: 500;
  letter-spacing: .04em;
}

.drawer-item:hover {
  background-color: var(--hover-color);
}

.drawer-item:last-of-type {
  border-bottom: 1px solid var(--divider);
}

.drawer-close {
  width: 100%;
}

.drawer-cloak.fullscreen .drawer {
  width: 100vw;
}
</style>
