// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

// export a factory function for creating fresh app, router and store instances
export function createApp() {
    const router = createRouter();
    const store = createStore();

    // sync so that route state is available as part of the store
    sync(store, router)

    const app = new Vue({
        router,
        store,
        // the root instance simply renders the App component.
        render: h => h(App)
    });

    return { app, router, store };
}
