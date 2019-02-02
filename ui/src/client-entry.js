import { createApp } from './main.js'
const { app, router } = createApp()

router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using `router.beforeResolve()` so that all
    // async components are resolved.
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // we only care about non-previously-rendered components,
        // so we compare them until the two matched lists differ
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (activated.length) {
            Promise.all(activated.map(component =>
                component.asyncData && component.asyncData()))
            .then(() => {
                next()
            })
            .catch(next)
        }
    })
   
    app.$mount('#app')
})