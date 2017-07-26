<template>
  <div>
    <span @click='home'>
      <i class='material-icons'>home</i>
    </span>
    <span @click='back'>
      <i class='material-icons'>arrow_back</i>
    </span>
    <span @click='forward'>
      <i class='material-icons'>arrow_forward</i>
    </span>
  </div>
</template>

<script>
import {navigation} from '@/mixins/navigation';

export default {
  name: 'History',
  mixins: [navigation]
};
</script>

