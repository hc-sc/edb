<template>
  <div>
    <h1 class='i-center'>{{$t('apptitle')}}</h1>
    <nav>
      <router-link to='/dossiers' class='app-nav' @click.native='navigate'>
        {{$tc('manageDossier', 2)}}
      </router-link>
      <router-link to='/globals' class='app-nav' @click.native='navigate'>
        {{$t('manageApplication')}}
      </router-link>
      <router-link to='/settings' class='app-nav' @click.native='navigate'>
        {{$tc('setting', 2)}}
      </router-link>
      <router-link to='/help' class='app-nav' @click.native='navigate'>
        {{$t('help')}}
      </router-link>
    </nav>
  </div>
</template>

<script>
import {history} from '@/mixins/history.js';

export default {
  name: 'Home',
  mixins: [history]
};
</script>

<style>
@import '../../assets/css/colors.css';
@import '../../assets/css/shadows.css';

.app-nav {
  display: block;
  margin: 5px auto;
  width: 80%;
  max-width: 500px;
  border-radius: 2px;
  box-shadow: var(--depth-1);
  text-decoration: none;
  color: black;
  transition: .2s ease;
  line-height: 3rem;
  font-size: 1.3rem;
  padding: 5px;
}

.app-nav:hover {
  box-shadow: var(--depth-3);
  transition: .2s ease;
}
</style>
