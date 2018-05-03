<template>
  <div>
    <h2>Countries directory</h2>
    <input v-model="filter" v-on:change="loadCountries" class="form-control" type="text" placeholder="Country name" />
    <loader v-if="loading"/>
    <ul v-if="!loading">
      <li v-for="(country, index) in countries" v-bind:key="index">
        <b>{{ country.name }}</b> {{ country.population }}
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
      filter: '',
      loading: true
    }
  },
  created() {
    this.loadCountries()
  },
  methods: {
    loadCountries() {
      this.loading = true;
      get('countries', { filter: this.filter }, [])
      .then(countries => {
        this.countries = countries
        this.loading = false
      })
    }
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
