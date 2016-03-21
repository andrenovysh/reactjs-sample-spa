import { combineReducers } from 'redux';
import { increment } from '../utils';
import * as ActionTypes from '../actions';

let now  = new Date();
now.setHours(0,0,0,0);

let initialRecords = [{
	id: increment(),
	date: now,
	merchant: 'Starbucks',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Coffebox',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Cafe',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Tea & Cookies',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Sunny Beach',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Hops',
	amount: 100,
	currency: 'USD',
	category: 'HI',
	details: 'Some details...'
}, {
	id: increment(),
	date: now,
	merchant: 'Om-nom-nom',
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
		case ActionTypes.RECORD_DELETED: 
			return state.filter(x => x.id != action.id);
		case ActionTypes.RECORD_MODIFIED:
			return state.map(x => {
				if(x.id == action.record.id) {
					return { ...action.record };
				} else {
					return x;
				}
			});
		case ActionTypes.RECORD_CREATED:
			return [...state, {...action.record}];
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