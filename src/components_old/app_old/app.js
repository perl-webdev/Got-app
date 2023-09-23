import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from '../header';
import CharacterPage from '../pages/characterPage/characterPage';
import GotService from '../../services/gotServices';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from '../pages/booksPage/booksPage';
import HousesPage from '../pages/housesPage/housesPage';
import HomePage from '../pages/homePage/homePage';
import NotFound from '../pages/notFoundPage/notFoundPage';


export default class App extends Component {
	GotService = new GotService();
	render() {
		return (
			<BrowserRouter>
				<div className='app'>
					<Container>
						<Header />
					</Container>
					<Container>
							<Routes>
								<Route path='/' exact Component={HomePage}/>
								<Route path='/characters' Component={CharacterPage}/>
								<Route path='/houses'  Component={HousesPage}/>
								<Route path='/books' Component={BooksPage}/>
								<Route path='*' element={<NotFound/>} />
							</Routes>
					</Container>
				</div>
			</BrowserRouter>
		);
	}

};
