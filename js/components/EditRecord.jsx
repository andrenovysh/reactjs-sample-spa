import React, { PropTypes } from 'react';
import { TextField, DatePicker, SelectField, MenuItem } from 'material-ui';
import { flexColumn } from '../styles';
import { validateAll, requiredValidator, categoryItems } from '../utils';

let textValue = (handler) => {
	return (e) => handler(e.currentTarget.value);
}

let dateValue = (handler) => {
	return (e, date) => handler(date);
}

let selectValue = (handler) => {
	return (event, index, value) => handler(value);
}

let validators = {
	date: (value) => {
		let now = new Date();
		now.setHours(0,0,0,0);

		if(value < now) {
			return "Past date is not allowed"
		}
	},
	merchant: requiredValidator,
	amount: requiredValidator,
	category: requiredValidator
}

class EditRecord extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = "EditRecord";

		this.state = { entity: {...this.props.entity}, errors: {}};
	}

	onPropChange(name, value) {
		let error = validators[name](value);

		let entity = {...this.state.entity, [name]: value};

		if(error) {
			let errors = {...this.state.errors, [name]: error};
			this.setState({ entity, errors});
		} else {
			let errors = {...this.state.errors};
			delete errors[name];

			this.setState({entity, errors});
		}
	}

	onSave() {
		let errors = validateAll(validators, this.state.entity);

		if(Object.keys(errors).length) {
			this.setState({...this.state, errors});
		} else {
			this.props.onSave(this.state.entity);
		}
	}

	render() {
		let categorySelectItems = categoryItems.map(item => {
			return <MenuItem key={item.value} value={item.value} primaryText={item.name}/>
		});

		return 	<div style={{...flexColumn, ...this.props.style}}>
					<DatePicker value={this.state.entity.date}
						hintText="Date"
						floatingLabelText="Date"
						onChange={dateValue(this.onPropChange.bind(this, 'date'))}
						errorText={this.state.errors.date} />

	        		<TextField value={this.state.entity.merchant} 
	        			hintText="Merchant"
						floatingLabelText="Merchant"
	        			onChange={textValue(this.onPropChange.bind(this, 'merchant'))}
	        			errorText={this.state.errors.merchant} />

	        		<TextField value={this.state.entity.amount} 
	        			hintText="Amount"
						floatingLabelText="Amount"
	        			onChange={textValue(this.onPropChange.bind(this, 'amount'))}
	        			errorText={this.state.errors.amount} />

	        		<SelectField value={this.state.entity.category} onChange={selectValue(this.onPropChange.bind(this, 'category'))}
	        			hintText="Category"
	        			floatingLabelText="Category"
						errorText={this.state.errors.category}>
	        				{ categorySelectItems }
        			</SelectField>

        			<div style={{marginTop: 20}}>
		        		<button onClick={this.onSave.bind(this)}>Save</button>
		        		{((onCancel) => {
		        			return !onCancel ? null : <button onClick={onCancel}>Cancel</button>;
		        		})(this.props.onCancel)}
	        		</div>
        		</div>;
	}
}

EditRecord.propTypes = {
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func
}

export default EditRecord;