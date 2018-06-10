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

export default {
  name: 'TopCountries',
  components: { Loader, CountryList },
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
        // Prerendering event
        document.dispatchEvent(new Event('custom-render-trigger'))
      })
  }
}
</script>
