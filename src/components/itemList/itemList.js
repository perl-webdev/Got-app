import React, { Component } from 'react';
import './itemList.css';
import GotService from '../../services/gotServices';
import Spinner from '../spinner';


export default class ItemList extends Component {

	GotService = new GotService();

	state = {
		charList: null
	}

	componentDidMount() {
		this.GotService.getAllCharacters()
			.then((charList) => {
				this.setState({
					charList
				})
			})
	}

	renderItems(arr) {
		return arr.map((item, i) => {
			return (
				<li 
					key={i}
					className="list-group-item"> 
					{item.name}
				</li>
			)
		})
	}

	render() {
		const { charList } = this.state;

		if (!charList) {
			return <Spinner />
		}

		const items = this.renderItems(charList);
		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}