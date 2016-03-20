export const increment = ((initial) => {
	let value = initial;

	return () => {
		return value++;
	}
})(1);

export const requiredValidator = (value) => {
	if(!value) {
		return "Field is required"
	}
}

export const validateAll = (validators, state) => {
	return Object.keys(validators).reduce((acc, key) => {
		let error = validators[key](state[key]);

		if(error) {
			acc[key] = error;
		}

		return acc;
	}, {});
}

export const categoryItems =  [
		{ value: 'AK', name: 'Alaska' }, 
		{ value: 'HI', name: 'Hawaii' },
		{ value: 'CA', name: 'California' }, 
	   	{ value: 'NV', name: 'Nevada' },
	   	{ value: 'OR', name: 'Oregon' },
	   	{ value: 'WA', name: 'Washington' },
		{ value: 'AZ', name: 'Arizona' },
		{ value: 'CO', name: 'Colorado' },
		{ value: 'ID', name: 'Idaho' },
		{ value: 'MT', name: 'Montana' },
		{ value: 'NE', name: 'Nebraska' },
		{ value: 'NM', name: 'New Mexico' },
		{ value: 'ND', name: 'North Dakota' },
		{ value: 'UT', name: 'Utah' },
		{ value: 'WY', name: 'Wyoming' },
		{ value: 'AL', name: 'Alabama' },
		{ value: 'AR', name: 'Arkansas' },
		{ value: 'IL', name: 'Illinois' },
		{ value: 'IA', name: 'Iowa' },
		{ value: 'KS', name: 'Kansas' },
		{ value: 'KY', name: 'Kentucky' },
		{ value: 'LA', name: 'Louisiana' },
		{ value: 'MN', name: 'Minnesota' },
		{ value: 'MS', name: 'Mississippi' },
		{ value: 'MO', name: 'Missouri' },
		{ value: 'OK', name: 'Oklahoma' },
		{ value: 'SD', name: 'South Dakota' },
		{ value: 'TX', name: 'Texas' },
		{ value: 'TN', name: 'Tennessee' },
		{ value: 'WI', name: 'Wisconsin' },
		{ value: 'CT', name: 'Connecticut' },
		{ value: 'DE', name: 'Delaware' },
		{ value: 'FL', name: 'Florida' },
		{ value: 'GA', name: 'Georgia' },
		{ value: 'IN', name: 'Indiana' },
		{ value: 'ME', name: 'Maine' },
		{ value: 'MD', name: 'Maryland' },
		{ value: 'MA', name: 'Massachusetts' },
		{ value: 'MI', name: 'Michigan' },
		{ value: 'NH', name: 'New Hampshire' },
		{ value: 'NJ', name: 'New Jersey' },
		{ value: 'NY', name: 'New York' },
		{ value: 'NC', name: 'North Carolina' },
		{ value: 'OH', name: 'Ohio' },
		{ value: 'PA', name: 'Pennsylvania' },
		{ value: 'RI', name: 'Rhode Island' },
		{ value: 'SC', name: 'South Carolina' },
		{ value: 'VT', name: 'Vermont' },
		{ value: 'VA', name: 'Virginia' },
		{ value: 'WV', name: 'West Virginia' }
	];