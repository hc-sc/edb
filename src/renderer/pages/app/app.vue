<template>
  <div>
    <vue-snackbar ref='snackbar' @notify='notify($event)'></vue-snackbar>
    <router-view class='main-view'></router-view>
  </div>
</template>

<script>
import Snackbar from '@/components/snackbar/snackbar.vue';
import {mapActions} from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions({
      'getPicklists': 'picklists/getPicklists',
      'notify': 'app/notify'
    })
  },
  created: function() {
    this.getPicklists().then(() => {
      this.notify('Picklists loaded');
    });
  },
  components: {
    'vue-snackbar': Snackbar
  }
};
</script>

<style>
.main-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
