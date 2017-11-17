<docs>
## Dialog

Dialogs are used to present a windowed experience. Modal dialogs restrict interaction with the rest of the page when the dialog is open.

### Values

#### Props

- cancel (Function): a callback for the 'cancel' action
- confirm (Function): a callback for the 'confirm' action
- content (String): the content for the dialog
- height (String): defines the height of the dialog in percent, based on vh
- id (String, required): the id
- modal (Boolean): defines whether the rest of the page should be interactive
- title (String): the header for the dialog
- type (String): shortcut for defining alerts, comfirm, prompts, or custom
- width (String): defines the width of the dialog in percent, based on vw

#### Data

- component (Component): defines a custom component to render in the dialog
- expanded (Boolean): whether the dialog is open

### Methods

- open() - open the dialog
- close() - hide the dialog
- show(config: Object): allows for supplying a custom component and model to the dialog, and opens it

### Slots

- confirm-text: the label for the confirm button
- cancel-text: the label for the cancel button
- default: replaces the content, as long as there is no component defined
- footer: the footer (including buttons for confirm and cancel)
- title: replaces the title header

</docs>

<template>
  <div class='dialog' :aria-expanded='expanded'>
    <aside :id='id' role='dialog' :aria-labelledby='`${id}-dialog-title`' :aria-describedby='`${id}-dialog-content`'>
      <div class='dialog-popup' :style='{width: `${width}`}'>
        <vue-toolbar color='none' class='dialog-title'>
          <span :id='`${id}-dialog-title`'>
            <slot name='title'>{{title}}</slot>
          </span>
        </vue-toolbar>
        <section class='dialog-content' :id='`${id}-dialog-content`' :style='{maxHeight: `${height}`}'>
          <slot>
            <component v-if='component' :is='component' ref='component'></component>
            <span v-else>{{content || 'undefined'}}</span>
          </slot>
        </section>
        <footer>
          <slot name='footer'>
            <div class='dialog-actions'>
              <vue-button ref='cancel' v-if='type === "confirm"' display='flat'>
                <slot name='cancel-text'>
                  {{$t('cancel')}}
                </slot>
              </vue-button>
              <vue-button ref='confirm' display='flat'>
                <slot name='confirm-text'>
                  {{$t('confirm')}}
                </slot>
              </vue-button>
            </div>
          </slot>
        </footer>
      </div>
    </aside>
    <div class='dialog-cloak' v-if='modal'></div>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Toolbar from '@/components/toolbar/toolbar.vue';
import {bus} from '@/plugins/plugin-event-bus.js';

export default {
  name: 'Dialog',
  props: {
    id: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '80%'
    },
    height: {
      type: String,
      default: '100%'
    },
    type: {
      type: String,
      default: 'alert',
      validator(value) {
        return ['alert', 'confirm', 'prompt', 'custom'].includes(value);
      }
    },
    modal: {
      type: Boolean,
      default: true
    },
    confirm: {
      type: Function,
      default(value) {
        return value.component ? value.$refs['component'].model : undefined;
      }
    },
    cancel: {
      type: Function,
      default(value) {
        return value;
      }
    }
  },
  data() {
    return {
      expanded: false,
      component: null,
      title: '',
      content: '',
    };
  },
  methods: {
    show(config) {
      const {component, model, message} = config;
      return new Promise((resolve, reject) => {
        if (component) {
          this.component = component;
          this.$nextTick(() => {
            if (model) {
              this.$set(this.$refs['component'], 'model', model);
            }
          });
        }

        else if (message) {
          this.content = message;
        }

        // since message dialogs don't need components, need to expand
        // here
        this.expanded = true;

        this.$refs['confirm'].$el.addEventListener('click', () => {
          resolve(this.confirm(this));
        });

        if ('cancel' in this.$refs) {
          this.$refs['cancel'].$el.addEventListener('click', () => {
            reject(this.cancel());
          });
        }

        // document.addEventListener('keydown', (event) => {
        //   if (event.keyCode === 27) reject(this.cancel());
        //   if (event.keyCode === 13) resolve(this.confirm(this));
        // });
      });
    },
    open() {
      this.expanded = true;
    },
    close() {
      this.expanded = false;
      this.component = undefined;
    }
  },
  mounted() {
    bus.$on('addDialog', params => {
      this.show(params);
    });
    bus.$on('hideDialog', () => {
      this.hide();
    });
  },
  watch: {
    component(comp) {
      this.component = comp;
    }
  },
  components: {
    'vue-button': Button,
    'vue-toolbar': Toolbar
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';
@import '../../assets/css/animations.css';

.dialog {
   width: 100%;
}

.dialog-cloak {
  display: none;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background: rgba(0, 0, 0, .2);
}

.dialog[aria-expanded] .dialog-cloak, .dialog[aria-expanded] .dialog-popup {
  display: flex;
  flex-direction: column;
  opacity: 1;
}

.dialog-popup {
  opacity: 0;
  display: none;
  z-index: 100000;
  background: white;
  min-width: 280px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: var(--depth-6);
}

.dialog-title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2rem;
  padding: 1rem 1rem 0;
}

.dialog-content {
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.dialog-actions {
  float: right;
  padding: 5px;
}
</style>