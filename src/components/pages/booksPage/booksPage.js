import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotServices';
import RowBlock from '../rowBlock';

export default class BooksPage extends Component {

	GotService = new GotService();

	state = {
		error: false,
		selectedBook: '',
	}

	componentDidCatch() {
		console.log ('error');
		this.setState({
			error: true
		})
	}

	onItemSelected = (id) => {
		this.setState({
			selectedBook: id
		})
	}
}