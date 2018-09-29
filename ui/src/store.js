import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { get } from './http'

const getCountries = (store, parameters) => {
    store.commit('setLoading', true)
    return get('countries', parameters, [])
    .then(countries => {
        store.commit('setCountries', countries)
        store.commit('setLoading', false)
    })
}

export function createStore () {
    return new Vuex.Store({
        state: {
            countries: [],
            loading: {
                value: false
            }
        },
        actions: {
            topCountries (store) {
                return getCountries(store)
            },
            search (store, filter) {
                return getCountries(store, { filter })
            }
        },
        mutations: {
            setCountries (state, countries) {
                state.countries = [ ...countries ];
            },
            setLoading (state, value) {
                state.loading = { value };
            }
        }
    })
}