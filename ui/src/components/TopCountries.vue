<template>
  <div>
    <loader v-if="loading"/>
    <country-list v-if="!loading" :countries="countries"/>
  </div>
</template>

<script>
import { get } from '../http.js';
import Loader from './Loader';
import CountryList from './CountryList';

function getCountries() {
  return get('countries', null, [])
    .then(countries => {
      this.countries = countries
      this.loading = false
    });
}

export default {
  name: 'TopCountries',
  components: { Loader, CountryList },
  data () {
    return {
      countries: [],
      loading: true
    }
  },
  asyncData() {
    return getCountries.apply(this);
  },
  created() {
    getCountries.apply(this);
  }
}
</script>
