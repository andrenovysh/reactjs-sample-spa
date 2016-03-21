import React from 'react';
import { TextField } from 'material-ui';
import { flexColumn } from '../styles';
import EditRecord from './EditRecord.jsx';
import { recordCreated } from '../actions';
import { connect } from 'react-redux';
import { bindDispatch, increment } from '../utils';

let mapDispatch2Props = (dispatch) => {
	return {
		createRecord: bindDispatch(dispatch, recordCreated)
	}
}

class CreateRecord extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = "CreateRecord";
	}

	onSave(record) {
		this.props.createRecord(record);
		this.context.router.transitionTo({
			pathname: 'records',
			search: ''
		});
	}

	render() {
		let entity = {
			id: increment(),
			date: new Date(),
			currency: 'USD'
		};

		return 	<EditRecord entity={entity} onSave={this.onSave.bind(this)} />
	}
}

CreateRecord.contextTypes = {
	router: React.PropTypes.object
}

export default connect(null, mapDispatch2Props)(CreateRecord);