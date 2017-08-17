<docs>
## Dialog

Used for prompting users for simple actions. You can use the default alert or confirm dialogs by defining a `type`, or create a custom one. There are slots to allow translusion of the header, content, and footer regions.

### Inputs

-
</docs>

<template>
  <div class='dialog' :aria-expanded='expanded'>
    <aside class='dialog-popup' :id='id' role='alertdialog' :aria-labelledby='`${id}-dialog-title`' :aria-describedby='`${id}-dialog-content`' :style='{width: `${width}`}'>
      <div class='dialog-popup'>
        <vue-toolbar color='none' class='dialog-title'>
          <span :id='`${id}-dialog-title`'>
            <slot name='title'>{{title}}</slot>
          </span>
        </vue-toolbar>
        <section class='dialog-content' :id='`${id}-dialog-content`' :style='{maxHeight: `${height}`}'>
          <slot>
            <component v-if='component' :is='component' ref='component'></component>
            <span v-else>{{content}}</span>
          </slot>
        </section>
        <footer>
          <slot name='footer'>
            <div class='dialog-actions'>
              <vue-button ref='cancel' v-if='type === "confirm"' display='flat'>
                <slot name='cancel-text'>
                  cancel
                </slot>
              </vue-button>
              <vue-button ref='confirm' display='flat'>
                <slot name='confirm-text'>
                  confirm
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

export default {
  name: 'Dialog',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    content: {
      type: String
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
        return ['alert', 'confirm'].includes(value);
      }
    },
    modal: {
      type: Boolean,
      default: true
    },
    component: {
      type: Object
    }
  },
  data() {
    return {
      expanded: false,
      model: {}
    };
  },
  methods: {
    show(config) {
      const {model} = config;
      return new Promise((resolve, reject) => {
        if (this.component && model) {
          const component = this.$refs['component'];
          this.$set(component, 'model', model);
        }
        this.expanded = true;

        this.$refs['confirm'].$el.addEventListener('click', () => {
          resolve(this.model);
        });
        if ('cancel' in this.$refs) {
          this.$refs['cancel'].$el.addEventListener('click', () => {
            reject();
          });
        }
      });
    },
    close() {
      this.expanded = false;
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
  z-index: 99;
  background: rgba(0, 0, 0, .2);
  /* animation: .2s var(--out) 0 0 reverse forward play fade; */
}

.dialog[aria-expanded] .dialog-cloak, .dialog[aria-expanded] .dialog-popup {
  /* animation: .2s var(--in) 0 0 normal forward play fade; */
  display: block;
  opacity: 1;
}

.dialog-popup {
  opacity: 0;
  display: none;
  z-index: 100;
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
}

.dialog-actions {
  float: right;
}

@keyframes fade {
  0% {
    display: none;
    opacity: 0;
  }

  .001% {
    display: block;
  }

  100% {
    opacity: 1;
    display: block;
  }
}
</style>
