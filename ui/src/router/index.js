import Vue from 'vue'
import Router from 'vue-router'
import TopCountries from '@/components/TopCountries'
import CountrySearch from '@/components/CountrySearch'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
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
  });
} 