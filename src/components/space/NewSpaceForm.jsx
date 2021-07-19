import React, { Component } from 'react';
import spaceClient from '../../lib/spaceClient';

class NewSpaceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spaceName: '',
			spaceType: '',
			imageUrlSpace: '',
			price: {
				daily: 0,
				weekly: 0,
				monthly: 0,
			},
			city: ' ',
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	// refactor hacer un client para cada modelo

	createSpaceHandler = async space => {
		event.preventDefault();
		try {
			const newSpace = await spaceClient.newSpace(space);
			await console.log(newSpace);
			await this.setState({
				spaceName: '',
				spaceType: '',
				imageUrlSpace: '',
				price: {
					daily: 0,
					weekly: 0,
					monthly: 0,
				},
				city: ' ',
			});
		} catch (e) {
			console.log(e);
		} finally {
			// redirect con this.props.history(ruta definida)}. Es para que haga el redirect despues de añadir el form
		}
	};

	render() {
		const {
			spaceName,
			spaceType,
			imageUrlSpace,
			// price: { daily, weekly, monthly },
			city,
		} = this.state;

		return (
			<div>
				<form onSubmit={this.createSpaceHandler}>
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
					<table>
						<tbody>
							<tr>
								<th>
									<label>
										<strong>Price:</strong>
									</label>
								</th>
							</tr>
							<tr>
								<th>
									Daily: <input type="number" name="this.state.price.daily" value={this.state.price.daily} onChange={this.handleChange} />{' '}
								</th>
								<th>
									Weekly: <input type="number" name="this.state.price.weekly" value={this.state.price.weekly} onChange={this.handleChange} />{' '}
								</th>
								<th>
									Monthly: <input type="number" name="this.state.price.monthly" value={this.state.price.monthly} onChange={this.handleChange} />{' '}
								</th>
							</tr>
						</tbody>
					</table>
					<label>
						<strong>City:</strong>
					</label>
					<input type="text" name="city" value={city} onChange={this.handleChange} />

					<input type="submit" value="Add new space" />
				</form>
			</div>
		);
	}
}

export default NewSpaceForm;
