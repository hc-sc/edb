import {mapState} from 'vuex';

const history = {
  computed: {
    ...mapState(['currState', 'numStates'])
  },
  methods: {
    // need to control the back/forward so we can turn off navigation
    navigate() {
      this.$store.commit('increaseCurrState');
      if (this.currState !== this.numStates) {
        this.$store.commit('updateNumStates', this.currState);
      }
    }
  }
};

export {history};