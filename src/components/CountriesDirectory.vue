<template>
  <div class="hello">
    <ul v-if="!loading">
      <li v-for="(country, index) in countries" v-bind:key="index">
        {{ country.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { get } from '../http.js';

export default {
  name: 'CountriesDirectory',
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
