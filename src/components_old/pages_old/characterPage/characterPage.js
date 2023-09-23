import React, { Component } from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotServices';
import RowBlock from '../../rowBlock';
import { Col, Row } from 'reactstrap';
import RandomChar from '../../randomChar';


export default class CharacterPage extends Component {
	GotService = new GotService();

	constructor(props) {
		super(props);
		this.state = {
			showCharacter: true,
			selectedChar: 130
		};
		this.toggleNewCharacter = this.toggleNewCharacter.bind(this);
	}

	onItemSelected = (id) => {
		this.setState({
			selectedChar: id
		})
	}

	toggleNewCharacter = () => {
		this.setState((prevState) => ({
			showCharacter: !prevState.showCharacter
		}));
	}

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

	onItemSelectedList = (id) => {
		this.setState({
			selectedChar: id+40
		})
	}

	render() {
		const { showCharacter } = this.state;

		if (this.state.error) {
			return (
				<ErrorMessage />
			)
		}

		const itemList = (
			<ItemList 
				onItemSelected={this.onItemSelectedList}
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
			<>
				<div class="container text-center">
						<Row>
							<Col lg={{ size: 5, offset: 0 }}>
								{showCharacter && <RandomChar />}
								<button
									type='button'
									className='btn btn-primary'
									id='btn'
									style={{ marginBottom: '20px' }}
									onClick={this.toggleNewCharacter}>Toggle new Character</button>
							</Col>
						</Row>
				</div>
				<RowBlock left={itemList} rigth={charDetails}/>
			</>
		)
	}
}