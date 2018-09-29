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

let _countries = [];
let _loading = true;

export default {
  name: 'TopCountries',
  components: { Loader, CountryList },
  data () {
    return {
      countries: _countries,
      loading: _loading
    }
  },
  asyncData() {
    // Be aware that the 'this' in the asyncData method is not the same object
    // than the actual object that Vue ends app rendering in the DOM.
    // If we modfiy the this.countries on the server response, the list of
    // countries will not get updated!
    return get('countries', null, [])
      .then(countries => {
        _countries = countries
        _loading = false
        // The countries are being returned for manually assigning them the first time the page is loaded
        return countries;
      });
  }
}
</script>
