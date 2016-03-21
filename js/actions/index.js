export const RECORD_CREATED = /*Symbol(*/'RECORD_CREATED'/*)*/;
export const RECORD_MODIFIED = /*Symbol(*/'RECORD_MODIFIED'/*)*/;
export const RECORD_DELETED = /*Symbol(*/'RECORD_DELETED'/*)*/;

export const createRecord = (record) => {
	return {
		type: RECORD_CREATED,
		record: record
	};
}

export const deleteRecord = (id) => {
	return {
		type: RECORD_DELETED,
		id: id
	};
}

export const saveRecord = (record) => {
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