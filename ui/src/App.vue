<template>
    <div id="app">
        <h2>Countries directory</h2>
        <img src="/static/images/logo.png" />
        <navigation />
        <loader v-if="loading" />
        <router-view />
    </div>
</template>

<script>
    import Navigation from '@/components/Navigation'
    import Loader from '@/components/Loader'

    export default {
        name: 'App',
        components: { Navigation, Loader },
        computed: {
            loading() {
                return this.$store.state.loading.value;
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
