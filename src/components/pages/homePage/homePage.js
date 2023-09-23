import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './homePage.css';
import GotService from '../../../services/gotServices';

export default class HomePage extends Component {
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
		return (
			<div className="row align-items-center text-center">
				<div className="col">
					<div className="card" style={{ width: "18rem" }}>
						<div className="card-body">
							<h2 className="card-title">Hello everybody!</h2>
							<p className="card-text">I'm glad to see you in Game of Thrones App. If you've been here before, press the button! If you haven't - check the other cards, please!</p>
							<Link to='/characters' className="btn btn-primary">Let's start!</Link>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card" style={{ width: "18rem" }}>
						<div className="card-body">
							<h2 className="card-title">First Step!</h2>
							<p className="card-text">On the top-right you can see 3 menu-items: Characters, Houses, and Books. By clicking each of them you'll be redirected to the page with its' Data Base.</p>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card" style={{ width: "18rem" }}>
						<div className="card-body">
							<h2 className="card-title">Second Step!</h2>
							<p className="card-text">On each of the pages you can click on every item in list and get all the information about it. You also can return to any other page or home page. Enjoy!</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}