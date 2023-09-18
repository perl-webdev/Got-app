import React, { Component } from 'react';
import { Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotServices';

export default class CharacterPage extends Component {

	GotService = new GotService();

	state = {
		selectedChar: 130,
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}
	
	onCharSelected = (id) => {
		this.setState({
			selectedChar: id
		})
	}

	render() {

		if(this.state.error) {
			return(
				<ErrorMessage/>
			)
		}

		return (
			<Row>
				<Col md='6'>
					<ItemList onCharSelected={this.onCharSelected} 
					getData={this.GotService.getAllCharacters}
					renderItem={({name,gender}) => `${name} (${gender})`}/>
				</Col>
				<Col md='6'>
					<CharDetails charId={this.state.selectedChar} />
				</Col>
			</Row>
		)
	}
}