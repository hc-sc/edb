import {mapState} from 'vuex';

const history = {
  computed: {
    ...mapState('app', ['currState', 'numStates'])
  },
  methods: {
    // need to control the back/forward so we can turn off navigation
    navigate() {
      this.$store.commit('app/increaseCurrState');
      if (this.currState !== this.numStates) {
        this.$store.commit('app/updateNumStates', this.currState);
      }
    }
  }
};

export {history};