<template>
  <div>
    <vue-dialog id='dialog' ref='dialog' type='confirm'></vue-dialog>
    <vue-snackbar ref='snackbar'></vue-snackbar>
    <router-view class='main-view'></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions({
      'getPicklists': 'picklists/getPicklists',
    })
  },
  created: function() {
    this.getPicklists().catch(() => console.log('Error loading picklists'));
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
