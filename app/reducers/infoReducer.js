import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.info, action) {
  switch (action.type) {

    case types.LOAD_INFO:
      return action.info;

    default:
      return state;
  }
}
