import {
  SET_ERROR,
  DISMISS_ERROR,
} from './types';

export function setError(message) {
  return {
    type: SET_ERROR,
    message,
  };
}

export function dismissError(id) {
  return {
    type: DISMISS_ERROR,
    id,
  };
}
