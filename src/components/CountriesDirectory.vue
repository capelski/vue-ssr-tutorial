<template>
  <div>
    <loader v-if="loading"/>
    <ul v-if="!loading">
      <li v-for="(country, index) in countries" v-bind:key="index">
        {{ country.name }}
      </li>
      <div v-if="!countries.length"><i>No countries available</i></div>
    </ul>
  </div>
</template>

<script>
import { get } from '../http.js';
import Loader from './Loader';

export default {
  name: 'CountriesDirectory',
  components: { Loader },
  data () {
    return {
      countries: [],
      loading: true
    }
  },
  created() {
    get('countries', null, [])
    .then(countries => {
      this.countries = countries
      this.loading = false
    })
  }
}
</script>

<style>
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
    padding: 5px;
  }
</style>
