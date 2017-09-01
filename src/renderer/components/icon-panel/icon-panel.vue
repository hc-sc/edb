<template>
  <div class='bottom-float'>
    <vue-icon fab @click.native='save()' id='save' :label='$t("save")' icon='save' position='top'></vue-icon>
    <vue-icon fab id='add' :label='$t("add")' icon='add' position='top' v-if='addable'></vue-icon>
    <vue-icon fab @click.native='revert' id='undo' :label='$t("revert")' icon='undo' position='top'>
    </vue-icon>
  </div>
</template>

<script>
import Icon from '@/components/icon/icon.vue';

export default {
  name: 'IconPanel',
  props: {
    addable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async save() {
      await this.$store.dispatch('app/updateAppData', {url: 'legalentity', model: this.model});
    },
    revert() {
      this.mapStateToModel();
    },
  },
  components: {
    'vue-icon': Icon
  }
};
</script>

<style>

</style>