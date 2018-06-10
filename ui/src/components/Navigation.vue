<template>
    <div class="navigation">
        <router-link to="/" class="nav-link">Top countries</router-link>
        |
        <router-link to="/search" class="nav-link">Country search</router-link>
    </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style>
    .navigation {
        padding: 20px;
    }

    a {
        text-decoration: none;
        font-weight: bold;
        padding: 0px 10px;
        color: #2e4254;
    }

    a.router-link-exact-active {
        color: #2faf7d;
    }
</style>
