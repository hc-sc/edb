<template>
  <div>
    <span @click='back'>
      <i class='material-icons'>&#xE5C4;</i>
    </span>
    <span @click='forward'>
      <i class="material-icons">&#xE5C8;</i>
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

