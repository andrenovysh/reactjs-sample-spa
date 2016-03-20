import { combineReducers } from 'redux';
import { increment } from '../utils';

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
}];

let records = (state = initialRecords, action) => {
	switch(action.type) {
		default: 
			return state;
	}
}

export default combineReducers({
	records
});