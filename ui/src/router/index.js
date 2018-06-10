import Vue from 'vue'
import Router from 'vue-router'
import TopCountries from '@/components/TopCountries'
import CountrySearch from '@/components/CountrySearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TopCountries',
      component: TopCountries
    },
    {
      path: '/search',
      name: 'CountrySearch',
      component: CountrySearch
    }
  ]
})
