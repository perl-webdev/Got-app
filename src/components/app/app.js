import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage/characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotServices';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default class App extends Component {
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

	render() {

		const { showCharacter } = this.state;
		return (
			<BrowserRouter>
				<div className='app'>
					<Container>
						<Header />
					</Container>
					<Container>
						<Row>
							<Col lg={{ size: 5, offset: 0 }}>
								{showCharacter && <RandomChar />}
								<button
									type='button'
									className='btn btn-primary visible'
									id='btn'
									style={{ marginBottom: '20px' }}
									onClick={this.toggleNewCharacter}>Toggle new Character</button>
							</Col>
						</Row>
							<Routes>
								<Route path='/characters' Component={CharacterPage}/>
							</Routes>
						<CharacterPage />
						<Row>
							<Col md='6'>
								<ItemList
									onItemSelected={this.onItemSelected}
									getData={this.GotService.getAllBooks}
									renderItem={(item) => (item.name)}/>
							</Col>
							<Col md='6'>
								<CharDetails charId={this.state.selectedChar} />
							</Col>
						</Row>
						<Row>
							<Col md='6'>
								<ItemList
									onItemSelected={this.onItemSelected}
									getData={this.GotService.getAllHouses}
									renderItem={(item) => item.name} />
							</Col>
							<Col md='6'>
								<CharDetails charId={this.state.selectedChar} />
							</Col>
						</Row>
					</Container>
				</div>
			</BrowserRouter>
		);
	}

};
