import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import promiseMiddleware from '../middleware/promiseMiddleware';
import getReducer from '../reducers';

const middleware = routerMiddleware(browserHistory);

const middlewares = [applyMiddleware(promiseMiddleware, middleware)];

export default function configureStore(initialState = {}, apolloClient) {
  const store = createStore(
    getReducer(apolloClient),
    initialState,
    composeWithDevTools(applyMiddleware(apolloClient.middleware()), ...middlewares),
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index')(apolloClient).default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
