import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


export default class ItemList extends Component {

	state = {
		itemList: null,
		error: false
	}

	componentDidMount() {
		const { getData } = this.props;

		getData()
			.then((itemList) => {
				this.setState({
					itemList
				})
			})
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	renderItems(arr) {
		return arr.map((item, i) => {
			// const {id} = item;
			const label = this.props.renderItem(item);
			return (
				<li
					key={i}
					className="list-group-item"
					onClick={() => this.props.onItemSelected(1+i)}>
					{label}
				</li>
			)
		})
	}

	render() {
		const { itemList } = this.state;

		if (!itemList) {
			return <Spinner/>
		}

		if(this.state.error) {
			return <ErrorMessage/>
		}

		const items = this.renderItems(itemList);
		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}