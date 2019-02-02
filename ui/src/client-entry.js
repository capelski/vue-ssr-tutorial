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

    // On client side, the routing is not triggered when the page is loaded;
    // the TopCountries component asyncData will not be executed and so it
    // will keep showing the loader forever.
    // In order for the component to be correctly loaded the first time we
    // load the page (accessing TopCountries), we execute the asyncData manually

    if (window.location.pathname === '/') {
        const topCountriesComponent = router.getMatchedComponents('/')[0];
        topCountriesComponent.asyncData().then(countries =>  {

            // Because the component exported in TopCountries and the actual component
            // rendered by Vue are diferent instances, Vue will not realize that the
            // TopCountries data needs to be updated
            const renderedTopCountries = app.$children[0].$children[1];
            console.log(`Countries length after asyncData: ${renderedTopCountries.countries.length}`);

            // It will not be updated either if we try to force an update:
            renderedTopCountries.$forceUpdate();
            console.log(`Countries length after $forceUpdate: ${renderedTopCountries.countries.length}`);
    
            // To make Vue aware of the changes, we need to trigger a change on the Vue observables:
            renderedTopCountries.countries = countries
            renderedTopCountries.loading = false
        });
    }
})