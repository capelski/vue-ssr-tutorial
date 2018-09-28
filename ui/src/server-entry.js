import { createApp } from './main.js';

export default context => {
    return new Promise((resolve, reject) => {
        
        const { app, router } = createApp();

        router.onReady(() => {

            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }

            Promise.all(matchedComponents.map(component => 
                component.asyncData && component.asyncData()))
            .then(() => {
                resolve(app);
            })
            .catch(reject);

        }, reject);

        router.push(context.url);
    });
}