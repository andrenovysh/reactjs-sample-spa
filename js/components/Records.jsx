import React from 'react';
import { connect } from 'react-redux';
import { saveRecord, deleteRecord } from '../actions';
import { flexColumn, disabledRow } from '../styles';
import { TextField, Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody } from 'material-ui';
import { Link } from 'react-router';
import { categoryItems } from '../utils'

import EditRecord from './EditRecord.jsx';

let mapState2Props = (state) => {
	return {
		records: state.records
	}
}

let mapDispatch2Props = (dispatch) => {
	return {
		saveRecord: (record) => {
			dispatch(saveRecord(record));
		},
		deleteRecord: (id) => {
			dispatch(deleteRecord(id));
		}
	}
}

class Records extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = "Records";

		this.state = {
			editedRecord: null
		};
	}

	onEdit(record) {
		this.setState({...this.state, 
			editedRecord: {...record}
		});
	}

	onSave() {
		this.props.saveRecord(this.state.editedRecord);

		this.setState({...this.state, 
			editedRecord: null
		});
	}

	onCancel() {
		this.setState({...this.state, 
			editedRecord: null
		});
	}

	render() {
		const rowStyleDefaults = {
			textAlign: 'center',
			whiteSpace: 'nowrap',
			width: '14.2%'
		};

		let rowStyle = rowStyleDefaults;
		let editedRowStyle = rowStyleDefaults;

		if(this.state.editedRecord) {
			rowStyle = { ...rowStyleDefaults, ...disabledRow };
		}

		const buttonPanelStyle = {
			width: 110
		};

		var rows = this.props.records.map((item, index) => {
			var rowProps = {};
			let linkProps = {};

			if(!this.state.editedRecord) {
				rowProps.onDoubleClick = this.onEdit.bind(this, item);
			} else {
				rowProps.selectable = false;
				linkProps.onClick = e => e.preventDefault();
			}

			let category = categoryItems.find(x => x.value == item.category);
			let result = 	[<TableRow key={item.id} {...rowProps}>
					        	<TableRowColumn style={rowStyle}>{item.date.toDateString()}</TableRowColumn>
					        	<TableRowColumn style={rowStyle}>{item.merchant}</TableRowColumn>
					        	<TableRowColumn style={rowStyle}>{item.amount}</TableRowColumn>
					        	<TableRowColumn style={rowStyle}>{item.currency}</TableRowColumn>
					        	<TableRowColumn style={rowStyle}>{category && category.name}</TableRowColumn>
					        	<TableRowColumn style={rowStyle}>
					        		<Link {...linkProps} to={'records/' + item.id}>Details</Link>
					        	</TableRowColumn>
					        	<TableRowColumn style={rowStyle}>
					        		<button onClick={this.props.deleteRecord(item.id)}>Delete</button>
					        	</TableRowColumn>
					    	</TableRow>];

			let isCurrentItemEditable = this.state.editedRecord && this.state.editedRecord.id == item.id;
			if(isCurrentItemEditable) {
				let editRow = 	<TableRow key={item.id + 'edit'} selectable={false}>
		        					<TableRowColumn colSpan={7}>
		        						<EditRecord style={{width: 200}} entity={item} 
		        							onSave={this.onSave.bind(this)} 
											onCancel={this.onCancel.bind(this)} />
									</TableRowColumn>
		    					</TableRow>;

				result.push(editRow);
			}

			return	result;
		});


		const style = {
			textAlign: 'center'
		};

		return 	<Table>
				    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
				    	<TableRow>
				        	<TableHeaderColumn style={style}>Date</TableHeaderColumn>
				        	<TableHeaderColumn style={style}>Merchant</TableHeaderColumn>
				        	<TableHeaderColumn style={style}>Amount</TableHeaderColumn>
				        	<TableHeaderColumn style={style}>Currency</TableHeaderColumn>
				        	<TableHeaderColumn style={style}>Category</TableHeaderColumn>
				        	<TableHeaderColumn style={style}>Details</TableHeaderColumn>
				        	<TableHeaderColumn style={style}>Actions</TableHeaderColumn>
				    	</TableRow>
				    </TableHeader>
				    <TableBody displayRowCheckbox={false}>
				    	{ rows }
					</TableBody>
				</Table>;
		;
	}
}

export default connect(mapState2Props, mapDispatch2Props)(Records);