import React, { Component } from 'react';
import ItemList from '../../itemList';
import BookDetails, { BookField } from '../../bookDetails';
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
		});
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
			<BookDetails bookId={this.state.selectedBook}> 
				<BookField field='name' label='Name' />
				<BookField field='numberOfPages' label='Number of Pages' />
				<BookField field='publisher' label='Publisher' />
				<BookField field='released' label='Release' />
			</BookDetails>
		)
		return (
			<RowBlock left={itemList} rigth={bookDetails} />
		)
	}
}