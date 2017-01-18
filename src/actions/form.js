import { FORM_SET_CSRF_TOKEN } from './types';

export function setCsrfToken(token) {
  return {
    type: FORM_SET_CSRF_TOKEN,
    token,
  };
}
