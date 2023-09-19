import React, { Component } from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotServices';
import RowBlock from '../../rowBlock';


export default class CharacterPage extends Component {

	GotService = new GotService();

	state = {
		selectedChar: '',
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	onItemSelected = (id) => {
		this.setState({
			selectedChar: id
		})
	}

	render() {

		if (this.state.error) {
			return (
				<ErrorMessage />
			)
		}

		const itemList = (
			<ItemList onItemSelected={this.onItemSelected}
				getData={this.GotService.getAllCharacters}
				renderItem={({ name, gender }) => `${name} (${gender})`} />
		)

		const charDetails = (
			<CharDetails charId={this.state.selectedChar}>
				<Field field ='gender' label='Gender'/>
				<Field field ='born' label='Born'/>
				<Field field ='died' label='Died'/>
				<Field field ='culture' label='Culture'/>
			</CharDetails>
		)
		return (
			<RowBlock left={itemList} rigth={charDetails}/>
		)
	}
}