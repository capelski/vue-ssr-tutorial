import Vue from 'vue'
import Router from 'vue-router'
import CountriesDirectory from '@/components/CountriesDirectory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CountriesDirectory',
      component: CountriesDirectory
    }
  ]
})
