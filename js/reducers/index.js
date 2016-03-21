import { combineReducers } from 'redux';
import { increment } from '../utils';
import * as ActionTypes from '../actions';

let records = (state = [], action) => {
	switch(action.type) {
		case ActionTypes.RECORDS_FETCHED:
			return action.data.records.map(x => {
				return {...x, date: new Date(x.date)};
			});
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

let recordsTotal = (state = 0, action) => {
	switch(action.type) {
		case ActionTypes.RECORDS_FETCHED:
			return action.data.total;
		default:
			return 0;
	}
}

let fetchParameters = (state = { offset: 0, limit: 5, filter: '' }, action) => {
	switch(action.type) {
		case ActionTypes.RECORDS_FETCHING:
			return {...action.parameters};
		default:
			return state;
	}
}

let apiState = (state = {}, action) => {
	switch(action.type) {
		case ActionTypes.RECORDS_FETCHING:
			return {...state, fetchingRecords: true };
		case ActionTypes.RECORDS_FETCHED:
			return {...state, fetchingRecords: false };
		case ActionTypes.RECORD_CREATING:
			return {...state, creatingRecord: true };
		case ActionTypes.RECORD_CREATED:
			return {...state, creatingRecord: false };
		case ActionTypes.RECORD_DELETED:
			return {...state, deletingRecord: null };
		case ActionTypes.RECORD_DELETING:
			return {...state, deletingRecord: { id: action.id } };
		default:
			return state;
	}
}

export default combineReducers({
	records,
	fetchParameters,
	apiState,
	recordsTotal
});