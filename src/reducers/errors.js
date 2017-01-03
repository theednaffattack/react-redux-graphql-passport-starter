import {
  SET_ERROR,
  DISMISS_ERROR,
} from '../actions/types';

export default function errorReducer(errors = [], action) {
  switch (action.type) {
    case SET_ERROR:
      return [...errors, action.message];
    case DISMISS_ERROR:
      return errors.filter((item, i) => {
        return i !== action.id;
      });
    default:
      return errors;
  }
}
