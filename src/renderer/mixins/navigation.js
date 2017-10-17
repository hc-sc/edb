/**
 * Allows programmatic navigation of the app using forward/back.
 * NOTE: that the states are stored in vuex.
 *
 * Additionally, the actual code that checks for route changes is in
 * @/mixins/model.js, in beforeRouteLeave
 */

import {history} from './history.js';

const navigation = {
  mixins: [history],
  methods: {
    back() {
      this.$router.back();
      this.$store.commit('decreaseCurrState');
    },
    forward() {
      this.$router.forward();
      this.$store.commit('increaseCurrState');
    },
    home() {
      this.$router.push('/');
      this.$store.commit('increaseCurrState');
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
