<template>
  <div>
    <vue-icon id='home' :label='$t("home")' icon='home' @click.native='home'></vue-icon>
    <vue-icon id='home' :label='$t("back")' icon='arrow_back' @click.native='back' :disabled='backDisabled()'></vue-icon>
    <vue-icon id='home' :label='$t("forward")' icon='arrow_forward' @click.native='forward' :disabled='forwardDisabled()'></vue-icon>
  </div>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import {navigation} from '@/mixins/navigation';

export default {
  name: 'History',
  mixins: [navigation],
  components: {
    'vue-icon': Icon
  }
};
</script>

