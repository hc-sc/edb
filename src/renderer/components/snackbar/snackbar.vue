<docs>
## Snackbar

NOT COMPLETE

Used to indicate to the user when an event has happened via a small message on the bottom of the page.

### Slots

- message: the snackbar message
- actions: the snackbar actions

</docs>

<template>
  <div class='snackbar' aria-live='assertive' aria-atomic='true' :aria-hidden='isHidden'>
    <slot name='message'>
      <span class='snackbar-text'>Hello</span>
    </slot>
    <slot name='actions'>
      <span class='snackbar-actions'>
        <vue-button display='flat'>okay</vue-button>
      </span>
    </slot>
  </div>
</template>

<script>
/**
  Code modified from https://material-components-web.appspot.com/snackbar.html
*/
import Button from '@/components/button/button.vue';
import {bus} from '@/plugins/plugin-event-bus.js';

export default {
  name: 'Snackbar',
  data() {
    return {
      isHidden: true
    };
  },
  mounted() {
    bus.$on('addSnackbar', () => {
      this.isHidden = false;
      setTimeout(() => {
        this.isHidden = true;
      }, 1000);
    });
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