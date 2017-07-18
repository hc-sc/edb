<template>
  <div>
    <vue-header>
      <span slot='left'>
        <span @click='$router.back'>back</span>
        <span @click='$router.forward'>next</span>
      </span>
      {{$t('manageApplication')}}
      <vue-nav id='global-nav' slot='subheader' :navs='pageNodes'></vue-nav>
    </vue-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Header from '@/components/header/header.vue';
import Nav from '@/components/nav/nav.vue';

export default {
  name: 'Globals',
  computed: {
    pageNodes: function() {
      return [
        {
          label: this.$tc('legalEntity', 2),
          path: '/globals/legal-entities'
        },
        {
          label: this.$tc('sender', 2),
          path: '/globals/senders'
        },
        {
          label: this.$tc('receiver', 2),
          path: '/globals/receivers'
        },
        {
          label: this.$tc('substance', 2),
          path: '/globals/substances'
        },
        {
          label: this.$tc('product', 2),
          path: '/globals/products'
        },
        {
          label: this.$tc('picklist', 2), path: '/globals/picklists'
        }
      ];
    }
  },
  methods: {
    navigateBack() {
      this.$router.back();
    },
    navigateForward() {
      this.$router.forward();
    }
  },
  components: {
    'vue-header': Header,
    'vue-nav': Nav,
    'vue-button': Button
  }
};
</script>

