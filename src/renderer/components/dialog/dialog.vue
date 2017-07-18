<docs>
## Dialog

Used for prompting users for simple actions. You can use the default alert or confirm dialogs by defining a `type`, or create a custom one. There are slots to allow translusion of the header, content, and footer regions.

### Inputs

-
</docs>

<template>
  <div class='dialog' :aria-expanded='expanded'>
    <div @click='expanded = true' :aria-controls='id' aria-haspopup='true'>
      <slot name='toggle'>
        <vue-button><slot></slot></vue-button>
      </slot>
    </div>
    <aside class='dialog-cloak' :id='id' role='alertdialog' :aria-labelledby='`${id}-dialog-title`' :aria-describedby='`${id}-dialog-content`'>
      <div class='dialog-popup'>
        <header class='dialog-title'>
          <slot name='title'>
            <span :id='`${id}-dialog-title`'>{{title}}</span>
          </slot>
        </header>
        <section class='dialog-content' :id='`${id}-dialog-content`'>
          <slot name='content'>
            <span>{{content}}</span>
          </slot>
        </section>
        <footer>
          <slot name='footer'>
            <div class='dialog-actions'>
              <vue-button v-if='type === "confirm"' display='flat' @click.native='emit("cancel")'>cancel</vue-button>
              <vue-button display='flat' @click.native='emit("confirm")'>okay</vue-button>
            </div>
          </slot>
        </footer>
      </div>
    </aside>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';

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
    type: {
      type: String,
      default: 'alert',
      validator(value) {
        return ['alert', 'confirm'].includes(value);
      }
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    emit(signal) {
      this.$emit(signal);
      this.close();
    },
    close() {
      this.expanded = false;
    }
  },
  components: {
    'vue-button': Button
  }
};
</script>

<style>
@import '../../assets/css/shadows.css';

.dialog {
  display: inline-block;
}

.dialog-cloak {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, .2);
}

.dialog[aria-expanded] .dialog-cloak {
  display: block;
}

.dialog-popup {
  background: white;
  min-width: 280px;
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
}

.dialog-actions {
  float: right;
}
</style>
