<docs>
## Snackbar

Used to display notifications at the bottom of the screen

### Values

#### Data

- hidden (Boolean): if the snackbar is displayed
- message (String): the message to be displayed

### Methods

- show(Object): the message to be displayed
- hide(): hide the message before the timeout

### Slots

- actions: the snackbar actions

</docs>

<template>
  <div class='snackbar f-container f-middle' aria-live='assertive' aria-atomic='true' :aria-hidden='hidden'>
    <slot name='message'>
      <span class='snackbar-text'>{{message}}</span>
    </slot>
    <slot name='actions'>
      <span class='snackbar-actions'>
        <vue-button display='flat' color='none' @click.native='hide'>okay</vue-button>
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
      hidden: true,
      message: '',
      timer: null
    };
  },
  methods: {
    show({message}) {
      this.message = message;
      this.hidden = false;
      this.timer = setTimeout(() => {
        this.hide();
      }, 5000);
    },
    hide() {
      if (this.timer) clearTimeout(this.timer);
      this.hidden = true;
      this.message = '';
    }
  },
  mounted() {
    bus.$on('addSnackbar', params => {
      this.show(params);
    });
    bus.$on('hideSnackbar', () => {
      this.hide();
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
  line-height: 1.6em;
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