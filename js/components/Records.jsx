import React from 'react';
import { connect } from 'react-redux';
import { recordSaved, recordDeleted, filterUpdated, pageRequested } from '../actions';
import { flexColumn, disabledRow, flexCenter } from '../styles';
import { TextField, Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody, TableFooter, IconButton, FontIcon } from 'material-ui';
import { Link } from 'react-router';
import { categoryItems, bindDispatch } from '../utils'

import EditRecord from './EditRecord.jsx';
import RecordsFilter from './RecordsFilter.jsx';

let paginate = (source, offset, limit) => {
	return source.slice(offset, offset + limit);
}

let mapState2Props = (state) => {
	let filtered = state.records;

	if(state.filter.merchant) {
		filtered = filtered.filter(x => x.merchant && x.merchant.indexOf(state.filter.merchant) >= 0);
	}

	return {
		records: filtered,
		recordsPage: paginate(filtered, state.page.offset, state.page.limit),
		page: {...state.page}
	}
}

let mapDispatch2Props = (dispatch) => {
	return {
		saveRecord: bindDispatch(dispatch, recordSaved),
		deleteRecord: bindDispatch(dispatch, recordDeleted),
		filterUpdated: bindDispatch(dispatch, filterUpdated),
		pageRequested: bindDispatch(dispatch, pageRequested)
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

	onSave(record) {
		this.props.saveRecord(record);

		this.setState({...this.state, 
			editedRecord: null
		});
	}

	onCancel() {
		this.setState({...this.state, 
			editedRecord: null
		});
	}

	onPageClick() {

	}

	render() {
		const rowStyleDefaults = {
			textAlign: 'center',
			whiteSpace: 'nowrap',
			width: '14.2%'
		};

		const rowStyle = rowStyleDefaults;
		const disabledRowStyle = { ...rowStyleDefaults, ...disabledRow };
		const buttonPanelStyle = { width: 110 };

		var rows = this.props.recordsPage.map((item, index) => {
			let isAnyItemEdited = this.state.editedRecord;
			let isCurrentItemEditable = false;
			let currentRowStyle = rowStyle;

			if(this.state.editedRecord) {
				isCurrentItemEditable = this.state.editedRecord.id == item.id;
				if(!isCurrentItemEditable) {
					currentRowStyle = disabledRowStyle;
				}
			}

			var rowProps = {};
			let linkProps = {};

			if(!isAnyItemEdited) {
				rowProps.onDoubleClick = this.onEdit.bind(this, item);
			} else {
				rowProps.selectable = false;
				linkProps.onClick = e => e.preventDefault();
			}

			let category = categoryItems.find(x => x.value == item.category);
			let result = 	[<TableRow key={item.id} {...rowProps}>
					        	<TableRowColumn style={currentRowStyle}>{item.date.toDateString()}</TableRowColumn>
					        	<TableRowColumn style={currentRowStyle}>{item.merchant}</TableRowColumn>
					        	<TableRowColumn style={currentRowStyle}>{item.amount}</TableRowColumn>
					        	<TableRowColumn style={currentRowStyle}>{item.currency}</TableRowColumn>
					        	<TableRowColumn style={currentRowStyle}>{category && category.name}</TableRowColumn>
					        	<TableRowColumn style={currentRowStyle}>
					        		<Link {...linkProps} to={'records/' + item.id}>Details</Link>
					        	</TableRowColumn>
					        	<TableRowColumn style={currentRowStyle}>
					        		<button disabled={this.state.editedRecord} onClick={this.props.deleteRecord.bind(null, item.id)}>Delete</button>
					        	</TableRowColumn>
					    	</TableRow>];

			
			if(isCurrentItemEditable) {
				let editRow = 	<TableRow key={item.id + 'edit'} selectable={false}>
		        					<TableRowColumn colSpan={7}>
		        						<EditRecord style={{width: 256, margin: 'auto'}} entity={item} 
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

		const styles = {
			footerContent: {
				float: 'right'
			},
			footerText: {
				float: 'right',
				paddingTop: 16,
				height: 16
			}
		};

		let offset = this.props.page.offset;
		let limit = this.props.page.limit;
		let total = this.props.records.length;

		return 	<div>
					<RecordsFilter onFilterUpdated={this.props.filterUpdated} />
					<Table>
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
						<TableFooter>
							<TableRow>
								<TableRowColumn style={styles.footerContent}>
								<IconButton disabled={offset === 0} onClick={this.props.pageRequested.bind(null, offset - limit, limit)}>
									<FontIcon className="material-icons">{'<'}</FontIcon>
								</IconButton>
								<IconButton disabled={offset + limit >= total} onClick={this.props.pageRequested.bind(null, offset + limit, limit)}>
									<FontIcon className="material-icons">{'>'}</FontIcon>
								</IconButton>
								</TableRowColumn>
								<TableRowColumn style={styles.footerText}>
									{Math.min((offset + 1), total) + '-' + Math.min((offset + limit), total) + ' of ' + total}
								</TableRowColumn>
							</TableRow>
						</TableFooter>
					</Table>
				</div>;
		;
	}
}

export default connect(mapState2Props, mapDispatch2Props)(Records);