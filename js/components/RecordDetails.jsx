import React, { PropTypes } from 'react';
import { flexColumn } from '../styles';
import { connect } from 'react-redux';
import { categoryItems } from '../utils'

let mapState2Props = (state, ownProps) => {
	return {
		record: state.records.find(x => {
			return x.id == ownProps.params.id;
		})
	}
}

let RecordDetails = ({ record }) => {
	let category = categoryItems.find(x => x.value == record.category);

	return 	<div style={flexColumn}>
				<p>{record.date && record.date.toDateString()}</p>
				<p>{record.merchant}</p>
				<p>{record.amount}</p>
				<p>{record.currency}</p>
				<p>{category && category.name}</p>
				<p>{record.details}</p>
			</div>;
}

RecordDetails.propTypes = {
	record: PropTypes.object.isRequired
}

export default connect(mapState2Props)(RecordDetails);