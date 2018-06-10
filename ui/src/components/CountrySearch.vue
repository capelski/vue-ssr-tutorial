<template>
  <div>
    <input v-model="filter" v-on:change="loadCountries" class="form-control" type="text" placeholder="Country name" />
    <loader v-if="loading"/>
    <country-list v-if="!loading" :countries="countries" :noResultsMessage="filter ? null: 'You need to provide a text to search for'"/>
  </div>
</template>

<script>
import { get } from '../http.js';
import Loader from './Loader';
import CountryList from './CountryList';

export default {
  name: 'CountrySearch',
  components: { Loader, CountryList },
  data () {
    return {
      countries: [],
      filter: '',
      loading: false
    }
  },
  created() {
    // Prerendering event
        document.dispatchEvent(new Event('custom-render-trigger'))
  },
  methods: {
    loadCountries() {
      if (this.filter) {
        this.loading = true;
        get('countries', { filter: this.filter }, [])
        .then(countries => {
          this.countries = countries
          this.loading = false
        })
      }
      else {
        this.countries = [];
      }
    }
  }
}
</script>

<style>
  .form-control {
    padding: 6px 12px;
    padding: .375rem .75rem;
    font-size: 16px;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s 
  }
</style>
