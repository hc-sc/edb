<template>
  <div class='f-container f-cross-start'>
    <vue-button class='input-prefix' @click.native='assignPID("substancepid")'>{{$t('generatepid')}}</vue-button>
    <span class='f-gap'></span>
    <vue-input type='text' id='substancepid' :label='$t("substancepid")' v-model='model.substancepid' required :pattern='getValidPIDRegExp()'></vue-input>
  </div>
</template>