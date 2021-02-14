import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware,compose} from 'redux';
import burgerBuilder from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
// const rootReducer = combineReducers({
//     ctr:counterReducer,
//     res:resultReducer
// });
const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching',action);
      const result = next(action);
      console.log("[Middleware] next state",store.getState());
      return result;
    }
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(burgerBuilder,composeEnhancers(
  applyMiddleware(thunk)
));
// const store = createStore(reducer,applyMiddleware(logger));
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
