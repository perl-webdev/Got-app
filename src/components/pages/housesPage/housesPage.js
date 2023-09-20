import React, { Component } from 'react';
import ItemList from '../../itemList';
import HouseDetails, { HouseField } from '../../houseDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotServices';
import RowBlock from '../../rowBlock';

export default class HousesPage extends Component {

	GotService = new GotService();

	state = {
		error: false,
		selectedHouse: '',
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	onItemSelected = (id) => {
		this.setState({
			selectedHouse: id
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
				getData={this.GotService.getAllHouses}
				renderItem={({ name, region }) => `${name} (${region})`}
			/>
		)

		const houseDetails = (
			<HouseDetails houseId={this.state.selectedHouse}> 
				<HouseField field='name' label='Name' />
				<HouseField field='region' label='Region' />
				<HouseField field='words' label='Words' />
				<HouseField field='seats' label='Seats' />
			</HouseDetails>
		)
		return (
			<RowBlock left={itemList} rigth={houseDetails} />
		)
	}
}