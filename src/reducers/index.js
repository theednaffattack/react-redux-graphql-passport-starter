import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import errors from './errors';
import counter from './counter';
import auth from './auth';
import user from './user';

export default function combiner(apolloClient) {
  return combineReducers({
    errors,
    counter,
    auth,
    user,
    routing,
    form: formReducer,
    apollo: apolloClient.reducer(),
  });
}
