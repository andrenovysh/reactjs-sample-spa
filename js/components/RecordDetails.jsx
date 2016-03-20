import React, { PropTypes } from 'react';
import { flexColumn } from '../styles';
import { connect } from 'react-redux';

let mapState2Props = (state, ownProps) => {
	return {
		record: state.records.find(x => {
			return x.id == ownProps.params.id;
		})
	}
}

let RecordDetails = ({ record }) => {
	return 	<div style={flexColumn}>
				<p>{record.date && record.date.toDateString()}</p>
				<p>{record.merchant}</p>
				<p>{record.amount}</p>
				<p>{record.currency}</p>
			</div>;
}

RecordDetails.propTypes = {
	record: PropTypes.object.isRequired
}

export default connect(mapState2Props)(RecordDetails);