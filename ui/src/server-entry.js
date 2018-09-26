import { createApp } from './main.js';

export default context => {
    return new Promise((resolve, reject) => {
        
        const { app, router } = createApp();

        router.onReady(() => {

            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }

            resolve(app);

        }, reject);

        router.push(context.url);
    });
}