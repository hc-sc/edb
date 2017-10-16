<template>
  <vue-select id='documents' :label='$t("documents")' :options='documents' :displayValue='o => o.name' :matchValue='o => o._id' :value='model.documentpid' @input='this.documentpid = $event._id'></vue-select>
</template>

<script>
export default {
  name: 'Document'
};
</script>