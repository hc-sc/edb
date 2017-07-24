<template>
  <div>
    <router-view class='main-view'></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'App',
  actions: mapActions('picklists', ['getPicklists']),
  created: function() {
    this.$store.dispatch('picklists/getPicklists');
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
