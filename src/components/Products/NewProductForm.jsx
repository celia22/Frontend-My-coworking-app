import React, { Component } from 'react';
import apiService from '../../lib/apiService';

class NewProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spaceName: " ",
			description: " ",
			price: 0,
		};
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	createNewProduct = async event => {
		event.preventDefault();
		const { spaceName, description, price } = this.state;
		try {
			const newSpace = await apiService.newProduct({ spaceName, description, price });
			await console.log(newSpace);
			await this.setState({
				spaceName: '',
				description: '',
				price: 0,
			});
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/admin' });
		}
	};

	render() {
		const {
			spaceName,
			description,
			price,
		} = this.state;

		return (
			<div className="new_edit_form_container">
				<form onSubmit={this.createNewProduct} className="new_edit_form">
					<label>
						<strong>Description:</strong>
					</label>
					<input type="text" name="description" value={description} onChange={this.handleChange} />

					<label>
						<strong>Price:</strong>
					</label>
					<input type="number" name="price" value={price} onChange={this.handleChange} />

				{/* HACER UN DESPLEGABLE CON TODOS LOS ESPACIOS PARA ASIGNARLO ??¿¿? */}
					<label>
						<strong>Space:</strong>
					</label>
					<input type="text" name="spaceName" value={spaceName} onChange={this.handleChange} /> 

						<input type="submit" value="Add new product" className="new_edit_send" />

				</form>
			</div>
		);
	}
}

export default NewProductForm;
