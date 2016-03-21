import React, { PropTypes } from 'react';
import { flexColumn } from '../styles';
import { connect } from 'react-redux';
import { categoryItems, bindDispatch } from '../utils'
import { fetchRecord } from '../actions';

let mapState2Props = (state, ownProps) => {
	return {
		fetchingDetails: state.apiState.fetchingDetails,
		record: state.recordDetails
	}
}

let mapDispatch2Props = (dispatch) => {
	return {
		fetchRecord: bindDispatch(dispatch, fetchRecord)
	}
}

class RecordDetails extends React.Component {
	constructor(props) {
		super(props);

		props.fetchRecord(props.params.id);
	}

	render() {
		let record = this.props.record;

		if(this.props.fetchingDetails) {
			return <div>Loading data</div>;
		}

		if(!record.id) {
			return <div>No data available.</div>;
		}
		
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
}

RecordDetails.propTypes = {
	record: PropTypes.object.isRequired
}

export default connect(mapState2Props, mapDispatch2Props)(RecordDetails);