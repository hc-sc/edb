<docs>
## Snackbar

NOT COMPLETE

Used to indicate to the user when an event has happened via a small message on the bottom of the page.

</docs>

<template>
  <div class='snackbar' aria-live='assertive' aria-atomic='true' :aria-hidden='!snackbarShowing'>
    <slot name='message'>
      <span class='snackbar-text'>Hello</span>
    </slot>
    <slot name='actions'>
      <span class='snackbar-actions'>
        <vue-button v-if='undoable' @click.native='undo'>undo</vue-button>
        <vue-button display='flat' @click.native='snackbarShowing = false'>okay</vue-button>
      </span>
    </slot>
  </div>
</template>

<script>
/**
  Code modified from https://material-components-web.appspot.com/snackbar.html
*/
import Button from '@/components/button/button.vue';

export default {
  name: 'Snackbar',
  props: {
    message: {
      type: String
    },
    undoable: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      snackbarShowing: false
    };
  },
  methods: {
    show() {
      this.snackbarShowing = true;
      window.setTimout(function() {
        this.snackbarShowing = false;
      }, this.delay);
    }
  },
  components: {
    'vue-button': Button
  }
};
</script>

<style>
@import '../../assets/css/animations.css';

.snackbar {
  line-height: 48px;
  padding: 0 1rem;
  width: 100%;
  color: var(--primary-text-dark);
  background-color: rgb(50, 50, 50);
  position: fixed;
  bottom: 0;
  display: flex;
  transform: translateY(0);
  transition: .2s var(--linear-out-slow-in);
  z-index: 10;
}

.snackbar[aria-hidden] {
  transform: translateY(48px);
  transition: .2s var(--fast-out-linear-in);
}

.snackbar-actions {
  margin-left: auto;
}
</style>