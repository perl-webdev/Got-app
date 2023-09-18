import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage/characterPage';


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCharacter: true,
			selectedChar:130,
			error: false
		};
		this.toggleNewCharacter = this.toggleNewCharacter.bind(this);
	}

	toggleNewCharacter = () => {
		this.setState((prevState) => ({
			showCharacter: !prevState.showCharacter
		}));
	}

	render() {
		const {showCharacter} = this.state;

		return (
			<>
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
					<CharacterPage/>
				</Container>
			</>
		);
	}

};
