import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCharacter: true,
			selectedChar:130
		};
		this.toggleNewCharacter = this.toggleNewCharacter.bind(this);
	}

	onCharSelected = (id) => {
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
					<Row>
						<Col md='6'>
							<ItemList onCharSelected={this.onCharSelected}/>
						</Col>
						<Col md='6'>
							<CharDetails charId={this.state.selectedChar}/>
						</Col>
					</Row>
				</Container>
			</>
		);
	}

};
