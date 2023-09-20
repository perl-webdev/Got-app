import React, { Component } from 'react';
import GotService from '../../services/gotServices';
import ErrorMessage from '../errorMessage';

const HouseField = ({ house, field, label }) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{house[field]}</span>
		</li>
	)
}

export {
	HouseField
}

export default class HouseDetails extends Component {
	GotService = new GotService();

	state = {
		house: null,
		error: false
	}

	componentDidMount() {
		this.updateHouse();
	}
	
	componentDidUpdate(prevProps) {
		if(this.props.houseId !== prevProps.houseId){
			this.updateHouse();
		}
	}

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
	}

	updateHouse() {
		const {houseId} = this.props;
		if(!houseId) {
			return;
		}
		this.GotService.getHouses(houseId)
			.then((house) => {
				this.setState({house})
			})
	}

	render() {
		if (!this.state.house) {
			return <span className='select-error'> Please select a house</span>
		}

		if(this.state.error) {
			return <ErrorMessage/>
		}

		const {house} = this.state;
		const {name} = house;

		return (
			<div className="char-details rounded">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					{
						React.Children.map(this.props.children, (child) => {
							return React.cloneElement(child, { house })
						})
					}
				</ul>
			</div>
		)
	}
}