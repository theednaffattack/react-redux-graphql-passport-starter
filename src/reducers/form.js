import { reducer } from 'redux-form';

import { FORM_SET_CSRF_TOKEN } from '../actions/types';

export default function formReducer(state = {}, action) {
  switch (action.type) {
    case FORM_SET_CSRF_TOKEN:
      return {
        ...state,
        csrfToken: action.token,
      };
    default:
      return reducer(state, action);
  }
};
