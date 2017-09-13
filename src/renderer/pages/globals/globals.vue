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
          label: this.$tc('legalentity', 2),
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
  components: {
    'vue-button': Button,
    'vue-header': Header,
    'vue-history': History,
    'vue-nav': Nav
  }
};
</script>

