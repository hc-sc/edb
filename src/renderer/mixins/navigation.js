import {history} from './history.js';

const navigation = {
  mixins: [history],
  methods: {
    back() {
      this.$store.commit('decreaseCurrState');
      this.$router.back();
    },
    forward() {
      this.$store.commit('increaseCurrState');
      this.$router.forward();
    },
    home() {
      this.$store.commit('increaseCurrState');
      this.$router.push('/');
    },
    backDisabled() {
      return this.currState < 1;
    },
    forwardDisabled() {
      return this.currState === this.numStates;
    }
  }
};

export {navigation};
