import React, {useEffect, useState } from 'react';
import './randomChar.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import GotService from '../../services/gotServices';

function RandomChar() {
	
	const [char, setChar] = useState({});
	const [loadings, setLoading] = useState(true);
	const [errors, setError] = useState(false);

	useEffect(() => {
				updateChar();
				let timerId = setInterval(updateChar, 4000);
				return () => {
					clearInterval(timerId);
				}
			},[])

	const gotService = new GotService();

	const onError = (err) => {
		setError(true);
		setLoading(false);
	}

	const updateChar = () => {
		const id = Math.floor(Math.random() * 140 + 25);
		gotService.getCharacters(id)
			.then(onCharLoaded)
			.catch(onError);
	}
	const onCharLoaded = (char) => {
		setChar(char);
		setLoading(false);
	}

	

	const { name, gender, born, died, culture } = char;
	const errorMessage = errors ? <ErrorMessage /> : null;
	if (loadings) {
		return <Spinner />
	}
	if (errors) {
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

export default RandomChar;