import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
// import io from 'socket.io-client';
import { routerMiddleware } from 'react-router-redux';

const router = routerMiddleware(hashHistory);

const logger = createLogger({
  level: 'info',
  collapsed: true
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, router) //, reduxImmutableStateInvariant())
  );
}



// import socketware from '../middleware/socketware';



// (process.env.SOCKET_URL ? process.env.SOCKET_URL : 'http://localhost:3000')


// export default createStore( reducer, applyMiddleware(socketware(io.connect(process.env.SOCKET_URL ? process.env.SOCKET_URL : 'http://localhost:3000'))
// ));
