<template>
    <div v-if="!loading">
        <country-list :countries="countries"/>
    </div>
</template>

<script>
    import { get } from '../http.js';
    import CountryList from './CountryList';

    export default {
        name: 'TopCountries',
        components: { CountryList },
        asyncData (store) {
            return store.dispatch('topCountries');
        },
        computed: {
            countries() {
                return this.$store.state.countries;
            },
            loading() {
                return this.$store.state.loading.value;
            }
        }
    }
</script>
