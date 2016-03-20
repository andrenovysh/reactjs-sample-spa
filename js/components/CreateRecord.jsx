import React from 'react';
import { TextField } from 'material-ui';
import { flexColumn } from '../styles';
import EditRecord from './EditRecord.jsx';
import { createRecord } from '../actions';
import { connect } from 'react-redux';

let mapDispatch2Props = (dispatch) => {
	return {
		createRecord: (record) => {
			dispatch(createRecord(record));
		}
	}
}

class CreateRecord extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = "CreateRecord";
	}

	render() {
		let entity = {
			date: new Date()
		};

		return 	<EditRecord entity={entity} onSave={this.props.createRecord} />
	}
}

export default connect(null, mapDispatch2Props)(CreateRecord);