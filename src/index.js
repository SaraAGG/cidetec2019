import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




import Router from './Router';
import configureStore from './store/configureStore';

import { Provider } from 'react-redux';

//import  createHistory from 'history/createBrowserHistory';

import { createBrowserHistory } from 'history';

import { routerMiddleware } from 'react-router-redux';

import * as serviceWorker from './serviceWorker';



//const history = createHistory()
const history = createBrowserHistory()
console.log("history", history)

const middleware = routerMiddleware(history)

const store = configureStore(middleware)
console.log("mi store", store)

ReactDOM.render(
	<Provider store={store}> <Router history= {history}/> </Provider>,
	document.getElementById('root'));
	serviceWorker.unregister();
