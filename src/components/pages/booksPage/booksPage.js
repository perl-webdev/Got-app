import React, { Component } from 'react';
import ItemList from '../../itemList';
import CharDetails, { Field } from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotServices';
import RowBlock from '../../rowBlock';

export default class BooksPage extends Component {

	GotService = new GotService();

	state = {
		error: false,
		selectedBook: '',
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	onItemSelected = (id) => {
		this.setState({
			selectedBook: id
		})
	}

	render() {
		if (this.state.error) {
			return (
				<ErrorMessage />
			)
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.GotService.getAllBooks}
				renderItem={({ name, publisher }) => `${name} (${publisher})`}
			/>
		)

		const bookDetails = (
			/*Here is the FUCKING PROBLEM (I MEAN itemId), WE NEED TO REWORK CHARDETAILS AND TO MAKE IT UNIVERSAL */ 
			<CharDetails itemId={this.state.selectedBook}> 
				<Field field='name' label='Name' />
				<Field field='numberofpages' label='Number of Pages' />
				<Field field='publisher' label='Publisher' />
				<Field field='released' label='Release' />
			</CharDetails>
		)
		return (
			<RowBlock left={itemList} rigth={bookDetails} />
		)
	}
}