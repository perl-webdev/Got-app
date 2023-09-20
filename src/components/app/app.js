import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage/characterPage';
import GotService from '../../services/gotServices';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from '../pages/booksPage/booksPage';
import HousesPage from '../pages/housesPage/housesPage';


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
								<Route path='/houses' Component={HousesPage}/>
								<Route path='/books' Component={BooksPage}/>
							</Routes>
					</Container>
				</div>
			</BrowserRouter>
		);
	}

};
