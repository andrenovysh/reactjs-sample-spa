import React, { PropTypes } from 'react';
import { TextField } from 'material-ui';
import { connect } from 'react-redux';

class RecordsFilter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value
		};
	}

	onValueUpdated(e) {
		this.setState({ 
			value: e.currentTarget.value
		});
	}

	render() {
		return <TextField 
				value={this.state.value} 
				onChange={this.onValueUpdated.bind(this)}
    			hintText="Merchant"
				floatingLabelText="Merchant contains"
				onBlur={(e) => this.props.onFilterUpdated(e.currentTarget.value)} />
	}
}

RecordsFilter.propTypes = {
	onFilterUpdated: PropTypes.func.isRequired
}

let mapState2Props = (state) => {
	return {
		value: state.fetchParameters.filter
	};
}

export default connect(mapState2Props)(RecordsFilter);