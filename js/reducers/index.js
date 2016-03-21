import { combineReducers } from 'redux';
import { increment } from '../utils';
import * as ActionTypes from '../actions';

let initialRecords = [{
	id: increment(),
	date: new Date(),
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: new Date(),
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: new Date(),
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: new Date(),
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: new Date(),
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: new Date(),
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: new Date(),
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}];

let filter = (state = {}, action) => {
	switch(action.type) {
		case ActionTypes.FILTER_UPDATED: 
			return {...state.filter, ...action.filter};
		default:
			return state;
	}
}

let records = (state = initialRecords, action) => {
	switch(action.type) {
		default: 
			return state;
	}
}

let page = (state = { offset: 0, limit: 5 }, action) => {
	switch(action.type) {
		case ActionTypes.PAGE_REQUESTED:
			return {...action.parameters};
		default:
			return state;
	}
}

export default combineReducers({
	filter,
	records,
	page
});