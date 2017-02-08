import * as types from './actionTypes';
import axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadInfoSuccess(info) {
  return { type: types.LOAD_INFO, info };
}

export function loadProcessSuccess(process, info) {
  return { type: types.LOAD_PROCESS, process, info };
}

export function loadServiceSuccess(service, info) {
  return { type: types.LOAD_SERVICE, service, info };
}

export function loadInfo() {
  let url = 'http://localhost:' +process.env.PORT+ '/api/system/info';
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(url)
      .then(res => {
        dispatch(loadInfoSuccess(res.data));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function findProcess(process) {
  let url = 'http://localhost:' +process.env.PORT+ '/api/processes/' +process;
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(url)
      .then(res => {
        console.log(res);
        dispatch(loadInfoSuccess(process, res.data));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function findService(service) {
  let url = 'http://localhost:' +process.env.PORT+ '/api/services/' +service;
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(url)
      .then(res => {
        console.log(res);
        dispatch(loadInfoSuccess(service, res.data));
      })
      .catch(error => {
        throw(error);
      });
  };
}
