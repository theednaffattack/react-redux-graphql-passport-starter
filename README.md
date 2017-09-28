# react-redux-graphql-passport-starter

This is an example for react-redux apollo/graphql application, with passport backend support using a fake dev-only in-memory user storage.

It provides server-side rendering.

It's based on [mtiger2k's starterkit](https://github.com/mtiger2k/react-redux-graphql-passport-starter). I replaced their mongodb user store with a dummy store to keep things simple for experimentation. Also I changed a bunch of code layout & style.

I added a couple authentication examples: Log in as `user1` with password `pass1` and use the remote counter. Then, try using the remote counter as `user2` / `pass2` -- note the error messages. See [api/schema.js](https://github.com/bnchdrff/react-redux-graphql-passport-starter/blob/master/api/schema.js#L49).

Also, I added an example of filtering subscription events in [api/subscriptions.js](https://github.com/bnchdrff/react-redux-graphql-passport-starter/blob/master/api/subscriptions.js#L12) -- by choosing which events propagate to which clients you can save a lot of computing & network traffic.

Finally I added in server-side rendering for the bits that make sense -- not the forms, yet, though!



## Note

This version only works with Node < 8!!!

An issue in the node-sass package limits Node to versions below 8.

## About

This is a starter boilerplate app I've put together using the following technologies:

* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings.
* [redux-form](https://github.com/erikras/redux-form) to manage form state in Redux
* [graphql](https://github.com/facebook/graphql) GraphQL is a query language and execution engine tied to any backend service.
* [graphql-server-express](https://github.com/apollostack/graphql-server) GraphQL Server is a community-maintained open-source GraphQL server.
* [react-apollo](https://github.com/apollostack/react-apollo) Use your GraphQL server data in your React components, with the Apollo Client.
* [apollo-client](https://github.com/apollostack/apollo-client) Apollo Client can be used in any JavaScript frontend where you want to use data from a GraphQL server.
* [Express](http://expressjs.com)
* [passport](https://github.com/jaredhanson/passport)
* [passport-local](https://github.com/jaredhanson/passport-local)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, sass and less,

### Installation

```bash
npm install
```

## Running Dev Server

This will start the API server, webpack builder, and web server:

```bash
npm start
```

## Explanation

#### Client Side

Use react-apollo and apollo-client to fetch data via graphql api.

#### API Server

Express with apollo server, using passport to authenticate.

---
Thanks for checking this out.

Mongo version by Scott, Tian, [shaoqin.tian@hpe.com]
