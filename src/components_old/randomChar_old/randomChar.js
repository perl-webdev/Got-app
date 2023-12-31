import React, { Component } from 'react';
import './randomChar.css';
import GotService from '../../services/gotServices';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';

export default class RandomChar extends Component {


	GotService = new GotService();
	state = ({
		char: {},
		loading: true,
		error: false
	})

	componentDidMount() {
		this.updateChar()
		this.timerId = setInterval(this.updateChar, 4000);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		})
	}

	updateChar = () => {
		const id = Math.floor(Math.random() * 140 + 25);
		this.GotService.getCharacters(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}
	onCharLoaded = (char) => {
		this.setState({ char, loading: false })
	}

	render() {
		const { char: { name, gender, born, died, culture }, loading, error } = this.state;
		const errorMessage = error ? <ErrorMessage /> : null;
		if (loading) {
			return <Spinner />
		}
		if (error) {
			return errorMessage;
		}

		const Bounce = styled.div`animation: 4s ${keyframes`${bounce}`} infinite`
		return (
			<Bounce>
				<div className="random-block rounded">
					<h4>Random Character: {name}</h4>
					<ul className="list-group list-group-flush">
						<li className="list-group-item d-flex justify-content-between">
							<span className="term">Gender </span>
							<span>{gender}</span>
						</li>
						<li className="list-group-item d-flex justify-content-between">
							<span className="term">Born </span>
							<span>{born}</span>
						</li>
						<li className="list-group-item d-flex justify-content-between">
							<span className="term">Died</span>
							<span>{died}</span>
						</li>
						<li className="list-group-item d-flex justify-content-between">
							<span className="term">Culture</span>
							<span>{culture}</span>
						</li>
					</ul>
				</div>
			</Bounce>
		);
	}
}
