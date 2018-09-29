# Vue SSR Tutorial

A series of steps on how to render a full webpack vue-cli scaffolded app on the server side, sending the actual HTML straight from the server (and thus complying with SEO standards) and minimizing the page load time. Each of the branches represents a different step of the process:

```bash
master
├── ssr-basic
|   ├── ssr-fetch
|   |    ├── ssr-async-data
|   |    |   └── ssr-vuex
```

- **master**: A simple Vue app scaffolded with vue-cli (using full webpack template), with asynchronous calls on page load. Also includes a Node.js server to serve the static Vue files and exposing a simple api where to fetch the data from
- **ssr-basic**: Checking out from master, modifies the server to prerender the Vue application instead of directly serving the static files. It also includes the necessary webpack modifications to build a server bundle from the Vue application
- **ssr-fetch**: First stone in the road! Fetch (the API used for the ajax calls) exists in the browsers but on the server; we need a workaround for that. Checking out from ssr-basic fixes the failing ajax calls on the server rendering
- **ssr-async-data**: Next problem! The ajax calls are now performed, but Vue is not waiting for them to finish :( Checking out from ssr-fetch, the Vue components and router are modified to wait for the asynchronous calls
- **ssr-vuex**: Finally working ^^ Checking out from ssr-async-data, solves the last problem: centralizes the state management in order that Vue knows that the asynchronous calls have already been executed during the server rendering and so, they don't need to be executed again

## Bonus

Sometimes the overhead of adding SSR does not pay off the results. In that cases, if we are just interested in SEO, there is a simpler option; prerendering the page by taking snapshots. The following two branches guide you through the process:

```bash
master
├── prerendering
|   ├── prerendering-custom
```

- **prerendering**: Checking out from master, uses the prerender-spa-plugin to generate static files of the rendered page
- **prerendering-custom**: Checking out from prerendering, it uses custom events to make the static files generation wait for the asynchronous calls to be finished