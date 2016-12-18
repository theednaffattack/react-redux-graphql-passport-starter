import { ADD_COUNTER } from '../actions/types';

export default function counterReducer(counter = { count: 0 }, action) {
  switch (action.type) {
    case ADD_COUNTER:
      return { count: counter.count + 1 };
    default:
      return counter;
  }
}
