<template>
  <div>
    <h1 class='i-center'>{{$t('apptitle')}}</h1>
    <nav class='home-nav'>
      <router-link to='/dossiers' @click.native='navigate'>
        <i class='material-icons'>folder</i>
        {{$tc('manageDossier', 2)}}
      </router-link>
      <router-link to='/globals' @click.native='navigate'>
        <i class='material-icons'>storage</i>
        {{$t('manageApplication')}}
      </router-link>
      <router-link to='/settings' @click.native='navigate'>
        <i class='material-icons'>settings</i>
        {{$tc('setting', 2)}}
      </router-link>
      <router-link to='/help' @click.native='navigate'>
        <i class='material-icons'>help</i>
        {{$t('help')}}
      </router-link>
    </nav>
    <p class='build-version'>
      <img class='logo' src='../../assets/images/pmra_green_leaf.svg' alt='PMRA logo'>
      {{`${$t('BUILD_VERSION')} ${version}`}}
    </p>
  </div>
</template>

<script>
import Icon from '@/components/icon/icon.vue';
import {history} from '@/mixins/history.js';
import {version} from '../../../package.json';

export default {
  name: 'Home',
  mixins: [history],
  data() {
    return {
      version
    };
  },
  components: {
    'vue-icon': Icon
  }
};
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/shadows.css';

.home-nav {
  padding: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.home-nav > a {
  margin: 3px 6px;
  color: var(--primary-text-light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 250px;
  border-radius: 2px;
  box-shadow: var(--depth-1);
  text-decoration: none;
  transition: .2s ease;
  font-size: 1.4rem;
  padding: 5px;
  min-height: 250px;
}

.home-nav a:hover {
  box-shadow: var(--depth-3);
  transition: .2s ease;
}

.home-nav i {
  display: block;
  font-size: inherit;
  font-size: 3rem;
  padding: 5px;
  color: var(--primary-color);
}

@media screen and (max-width: 600px) {

  .home-nav > a {
    flex-direction: row;
    font-size: 1rem;
    max-width: none;
    min-height: 0;
    text-align: left;
    justify-content: flex-start;
  }

  .home-nav i {
    display: block;
    text-align: left;
    font-size: inherit;
  }
}

.build-version {
  position: fixed;
  bottom: 10px;
}

.build-version .logo {
  display: inline-block;
  width: 1.4rem;
  vertical-align: bottom;
  margin-left: 5px;
}
</style>
