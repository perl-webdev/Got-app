import React, { Component } from 'react';
import GotService from '../../services/gotServices';
import ErrorMessage from '../errorMessage';

const BookField = ({ book, field, label }) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{book[field]}</span>
		</li>
	)
}

export {
	BookField
}

export default class BookDetails extends Component {
	GotService = new GotService();

	state = {
		book: null,
		error: false
	}

	componentDidMount() {
		this.updateBook();
	}
	
	componentDidUpdate(prevProps) {
		if(this.props.bookId !== prevProps.itemId){
			this.updateBook();
		}
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	updateBook() {
		const {bookId} = this.props;
		if(!bookId) {
			return;
		}
		this.GotService.getBooks(bookId)
			.then((book) => {
				this.setState({book})
			})
	}

	render() {
		if (!this.state.book) {
			return <span className='select-error'> Please select a book</span>
		}

		if(this.state.error) {
			return <ErrorMessage/>
		}

		const {book} = this.state;
		const {name} = book;

		return (
			<div className="char-details rounded">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					{
						React.Children.map(this.props.children, (child) => {
							return React.cloneElement(child, { book })
						})
					}
				</ul>
			</div>
		)
	}
}