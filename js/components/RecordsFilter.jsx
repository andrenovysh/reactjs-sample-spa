import React from 'react';
import { TextField } from 'material-ui';

let RecordsFilter = ({onFilterUpdated}) => {
	return <TextField 
    			hintText="Merchant"
				floatingLabelText="Merchant contains"
				onBlur={(e) => onFilterUpdated(e.currentTarget.value)} />
}

export default RecordsFilter;