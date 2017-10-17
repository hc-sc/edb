<template>
  <div>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{$t('manageApplication')}}
      <vue-nav id='global-nav' slot='subheader' :navs='pageNodes'></vue-nav>
    </vue-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import Nav from '@/components/nav/nav.vue';

export default {
  name: 'Globals',
  computed: {
    pageNodes: function() {
      return [
        {
          label: this.$t('legalentities'),
          path: '/globals/legal-entities'
        },
        {
          label: this.$t('senders'),
          path: '/globals/senders'
        },
        {
          label: this.$t('receivers'),
          path: '/globals/receivers'
        },
        {
          label: this.$t('substances'),
          path: '/globals/substances'
        },
        {
          label: this.$t('products'),
          path: '/globals/products'
        },
        {
          label: this.$tc('picklist', 2),
          path: '/globals/picklists'
        }
      ];
    }
  },
  components: {
    'vue-button': Button,
    'vue-header': Header,
    'vue-history': History,
    'vue-nav': Nav
  }
};
</script>

