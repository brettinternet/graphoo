import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.data, action) {
  switch (action.type) {
    case types.LOAD_DATA:
      let module = action.module,
          newData = action.data,
          newObj = {};
      newObj[module] = newData;
      return Object.assign({}, state, newObj);

    case types.STREAM_DATA:
      return [
        ...state.slice(1),
        Object.assign({}, action.data)
      ];

    default:
      return state;
  }
}
