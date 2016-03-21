export const RECORD_MODIFIED = /*Symbol(*/'RECORD_MODIFIED'/*)*/;

export const RECORD_CREATING = 'RECORD_CREATING';
export const RECORD_CREATED = 'RECORD_CREATED';

import fetch from 'isomorphic-fetch';

export const RECORDS_FETCHING = 'RECORDS_FETCHING';
export const RECORDS_FETCHED = 'RECORDS_FETCHED';

let parseJSON = (response) => response.json();

export const fetchRecords = (filter, page) => {
	return (dispatch, getState) => {
		dispatch({type: RECORDS_FETCHING});

		fetch('/records').then(parseJSON)
			.then(data => {
				dispatch({
					type: RECORDS_FETCHED,
					data
				});
			});
	}
}

export const RECORD_DELETING = 'RECORD_DELETING';
export const RECORD_DELETED = 'RECORD_DELETED';

export const deleteRecord = (id) => {
	return {
				type: RECORD_DELETED,
				id
			};/*);
	return (dispatch, getState) => {
		dispatch({type: RECORD_DELETING});

		fetch('/records?id=' + id, { method: 'DELETE' }).then(parseJSON)
			.then(data => {
				dispatch({
					type: RECORD_DELETED,
					id
				});
			});*/
}

export const recordCreated = (record) => {
	return {
		type: RECORD_CREATED,
		record: record
	};
}

export const createRecord = (record) => {
	return (dispatch, getState) => {
		dispatch({type: RECORD_CREATING});
	}
}

export const recordDeleted = (id) => {
	return {
		type: RECORD_DELETED,
		id: id
	};
}

export const recordSaved = (record) => {
	return {
		type: RECORD_MODIFIED,
		record: record
	};
}

export const FILTER_UPDATED = 'FILTER_UPDATED';

export const filterUpdated = (filter) => {
	return {
		type: FILTER_UPDATED,
		filter: {
			merchant: filter
		}
	}
}

export const PAGE_REQUESTED = 'PAGE_REQUESTED';

export const pageRequested = (offset, limit) => {
	return {
		type: PAGE_REQUESTED,
		parameters: {
			offset,
			limit
		}
	}
}