// Inspired by https://github.com/davidtheclark/focus-trap
const focusable = {
  data() {
    return {
      focusable: [],
      focusedIndex: null
    };
  },
  methods: {
    focus(index) {
      if (this.focusable && this.focusable.length && index >= 0 && index < this.focusable.length) {
        this.focusedIndex = index;
        this.focusable[this.focusedIndex].focus();
      }
    },
    getFocusableNodes(selector, container = this.$el) {
      this.focusable = container.querySelectorAll(selector);
    }
  }
};

export {focusable};