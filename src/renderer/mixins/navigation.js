const navigation = {
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
    home() {
      this.$router.push('/');
    }
  }
};

export {navigation};
