import React from 'react';
import { TextField } from 'material-ui';
import { flexColumn } from '../styles';
import EditRecord from './EditRecord.jsx';
import { createRecord } from '../actions';
import { connect } from 'react-redux';
import { bindDispatch, increment } from '../utils';

let mapState2Props = (state) => {
	return {
		creatingRecord: state.apiState.creatingRecord,
		recordCreated: state.apiState.recordCreated
	}
}

let mapDispatch2Props = (dispatch) => {
	return {
		createRecord: bindDispatch(dispatch, createRecord)
	}
}

let counter = 100500;

class CreateRecord extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = "CreateRecord";
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.recordCreated) {
			this.context.router.transitionTo({
				pathname: 'records',
				search: ''
			});
		}
	}

	onSave(record) {
		this.props.createRecord(record);
	}

	render() {
		if(this.props.creatingRecord) {
			return <div>Creating...</div>;
		}

		let entity = {
			id: counter++,
			date: new Date(),
			currency: 'USD'
		};

		return 	<EditRecord entity={entity} onSave={this.onSave.bind(this)} />
	}
}

CreateRecord.contextTypes = {
	router: React.PropTypes.object
}

export default connect(mapState2Props, mapDispatch2Props)(CreateRecord);