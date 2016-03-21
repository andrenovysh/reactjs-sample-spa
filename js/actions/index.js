export const RECORD_MODIFIED = /*Symbol(*/'RECORD_MODIFIED'/*)*/;

import fetch from 'isomorphic-fetch';

export const RECORDS_FETCHING = 'RECORDS_FETCHING';
export const RECORDS_FETCHED = 'RECORDS_FETCHED';

let parseJSON = (response) => response.json();

export const fetchRecords = (parameters) => {
	return (dispatch, getState) => {
		dispatch({
			type: RECORDS_FETCHING,
			parameters: parameters
		});

		let query = '';
		for(let key in parameters) {
			if(parameters[key] != undefined) {
				query +=  key + '=' + parameters[key] + '&';
			}
		}

		let url = '/records';
		if(query !== undefined) {
			url += "?" + query;
		}

		fetch(url).then(parseJSON)
			.then(data => {
				dispatch({
					type: RECORDS_FETCHED,
					data
				});
			});
	}
}

export const RECORD_FETCHING = 'RECORD_FETCHING';
export const RECORD_FETCHED = 'RECORD_FETCHED';

export const fetchRecord = (id) => {
	return (dispatch, getState) => {
		dispatch({
			type: RECORD_FETCHING,
			id: id
		});

		fetch('/records/' + id).then(parseJSON)
			.then(data => {
				dispatch({
					type: RECORD_FETCHED,
					data
				});
			});
	}	
}

export const RECORD_CREATING = 'RECORD_CREATING';
export const RECORD_CREATED = 'RECORD_CREATED';

export const createRecord = (record) => {
	return (dispatch, getState) => {
		dispatch({
			type: RECORD_CREATING
		});

		var parameters = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(record)
		};

		fetch('/records', parameters)
			.then(parseJSON)
			.then(data => {
				dispatch({
					type: RECORD_CREATED,
					data
				});
			});
	}
}

export const RECORD_UPDATING = 'RECORD_UPDATING';
export const RECORD_UPDATED = 'RECORD_UPDATED';

export const updateRecord = (record, fetchParameters) => {
	return (dispatch, getState) => {
		dispatch({
			type: RECORD_UPDATING
		});

		var parameters = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(record)
		};

		fetch('/records/' + record.id, parameters)
			.then(parseJSON)
			.then(data => {
				setTimeout(() => {
					dispatch(fetchRecords(fetchParameters));
				});
			});
	}
}

export const RECORD_DELETED = 'RECORD_DELETED';

export const deleteRecord = (id, fetchParameters) => {
	return (dispatch, getState) => {
		var parameters = {
			method: 'DELETE'
		};

		fetch('/records/' + id, parameters)
			.then(() => {
				setTimeout(() => {
					dispatch(fetchRecords(fetchParameters));
				});
			});
	}
}