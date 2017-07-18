<template>
  <div>
    <router-view class='main-view'></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'App',
  actions: mapActions(['getPicklists']),
  created: function() {
    this.$store.dispatch('getPicklists');
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
