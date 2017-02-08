import {combineReducers} from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import data from './dataReducer';
import info from './infoReducer';
import settings from './settingsReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import logs from './logsReducer';

const rootReducer = combineReducers({
  routing,
  settings,
  data,
  info,
  logs,
  ajaxCallsInProgress
});

export default rootReducer;
