import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';

import persistState from 'redux-localstorage';

import thunk from 'redux-thunk';

import { routerReducer } from 'react-router-redux';


const enhancer = compose(
	persistState(['user','products'])
)


const rootReducer = combineReducers({
	...reducers,
	router: routerReducer
})

export default function configureStore(middleware){
	return createStore(
		rootReducer,
		compose(applyMiddleware(middleware, thunk), enhancer),		
		//compose(applyMiddleware(middleware),
		//enhancer
		);
}