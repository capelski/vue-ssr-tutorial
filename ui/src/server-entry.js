import { createApp } from './main.js';

export default context => {
    return new Promise((resolve, reject) => {
        
        const { app, router, store } = createApp();

        router.onReady(() => {

            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }

            Promise.all(matchedComponents.map(component =>
                component.asyncData && component.asyncData(store)))
            .then(() => {
                // After all preFetch hooks are resolved, our store is now
                // filled with the state needed to render the app.
                // When we attach the state to the context, and the `template` option
                // is used for the renderer, the state will automatically be
                // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
                context.state = store.state;
                resolve(app);
            })
            .catch(reject);

        }, reject);

        router.push(context.url);
    });
}