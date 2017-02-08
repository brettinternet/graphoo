import * as types from './actionTypes';
import axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadDataSuccess(module, data) {
  return { type: types.LOAD_DATA, module, data };
}

export function loadData(module, time) {
  let url = 'http://localhost:' +process.env.PORT+ '/api/' +module+ '/data/' +(time ? time : 'today');
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(url)
      .then(res => {
        let data = JSON.parse(res.data.body);
        dispatch(loadDataSuccess(module, data.rows));
      })
      .catch(error => {
        throw(error);
      });
  };
}



// export function getStream(dispatch) {
//   let url = 'http://localhost:' +settings.port+ '/api/' +module+ '/stream'
//   axios.get(url)
//     .then(res => {
//       dispatch(addStreamAction(res.))
//     });
// }
