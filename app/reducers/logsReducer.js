import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.logs, action) {
  switch (action.type) {

    case types.LOAD_LOGS:
      return action.logs;

    default:
      return state;
  }
}
