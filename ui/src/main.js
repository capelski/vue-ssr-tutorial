// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router'

Vue.config.productionTip = false

// export a factory function for creating fresh app, router and store instances
export function createApp() {
    const router = createRouter();
    const app = new Vue({
        router,
        // the root instance simply renders the App component.
        render: h => h(App)
    });

    return { app, router };
}
