import * as types from './actionTypes';
import axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadLogsSuccess(logs) {
  return { type: types.LOAD_LOGS, logs };
}

export function loadLogs(query) {
  let url = `http://localhost:${process.env.PORT}/api/logs${(query && query.limit) ? '?limit=' +query.limit : ''}`;
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(url)
      .then(res => {
        dispatch(loadLogsSuccess(res.data.file));
      })
      .catch(error => {
        throw(error);
      });
  };
}
