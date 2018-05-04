<template>
    <ul>
      <li v-for="(country, index) in countries" v-bind:key="index">
        <b>{{ country.name }}</b> {{ country.population }}
      </li>
      <div v-if="!countries.length"><i>{{ noResultsMessage || 'No countries available' }}</i></div>
    </ul>
</template>

<script>
export default {
  name: 'CountryList',
  props: [ 'countries', 'noResultsMessage' ]
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
