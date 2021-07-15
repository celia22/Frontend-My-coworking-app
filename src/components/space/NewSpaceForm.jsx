import React, { Component } from 'react';
import { withAuth } from '../../providers/AuthProvider';
import spaceClient from '../../lib/spaceClient';

class NewSpaceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spaceName: '',
			spaceType: '',
			imageUrlSpace: '',
			services: [],
			availableSpots: 0,
			price: 0,
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	// refactor hacer un client para cada modelo 

		createSpaceButton = async (space) => {
		event.preventDefault();
		try {
			const newSpace = await spaceClient.newSpace(space)
			await console.log(newSpace);
			await this.setState({
				spaceName: '',
				spaceType: '',
				imageUrlSpace: '',
				services: [],
				price: 0,
			});
		} catch (e) {
			console.log(e);
		} finally { // redirect con this.props.history(ruta definida)}. Es para que haga el redirect despues de añadir el form
	 }
	};

	render() {
		const { spaceName, spaceType, imageUrlSpace, services, availableSpots, price } = this.state;

		return (
			<div>
				<form onSubmit={this.createSpaceButton}>
					<label>
						<strong>Name:</strong>
					</label>
					<input type="text" name="spaceName" value={spaceName} onChange={this.handleChange} />

					<label>
						<strong>Type:</strong>
					</label>
					<input type="text" name="spaceType" value={spaceType} onChange={this.handleChange} />

					<label>
						<strong>Image:</strong>
					</label>
					<input type="text" name="imageUrlSpace" value={imageUrlSpace} onChange={this.handleChange} />

					<label>
						<strong>Services:</strong>
					</label>
					<input type="text" name="services" value={services} onChange={this.handleChange} />

					<label>
						<strong>Free spots:</strong>
					</label>
					<input type="number" name="availableSpots" value={availableSpots} onChange={this.handleChange} />

					<label>
						<strong>Price:</strong>
					</label>
					<input type="number" name="price" value={price} onChange={this.handleChange} />

					<input type="submit" value="Add new space" />
				</form>
			</div>
		);
	}
}

export default withAuth(NewSpaceForm);
