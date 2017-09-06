<docs>
## Progress

Spinners and determinate progress bars to indicate loading.

### Values

#### Props

- type (String, default = 'circular'): spinner or bar
- determinate (Boolean, default = false): if the indicator should have determined position
- progress (Number, default = 0): the amount of progress that has been completed

</docs>

<template>
  <div class='progress' :class='[type, determinate]'></div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    type: {
      type: String,
      default: 'circular',
      validator(value) {
        return ['circular', 'linear'].includes(value);
      }
    },
    determinate: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/animations.css';

.progress {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.progress.circular {
  border: 3px solid var(--divider);
  border-top: 3px solid var(--accent-color);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

.progress.linear {
  height: 3px;
  background-color: var(--divider);
  width: 100%;
}

.progress.linear::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 3px;
  transform: translateX(-100%);
  background-color: var(--accent-color);
  animation: progress 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0)
  }
}
</style>