import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../lib/apiService';

		// products, pasar id ref, en el handle submit de send prod en front, en service 1º crear producto, luego espacio
		// y hacer push de prods y metodo save().
class NewProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: " ",
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
		const {  description, price } = this.state;
		try {
			const newSpace = await apiService.newProduct({ description, price });
			await console.log(newSpace);
			// await this.setState({
			// 	spaceName: '',
			// 	description: '',
			// 	price: 0,
			// });
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/admin' });
		}
	};

	render() {
		const {
			name,
			description,
			price,
		} = this.state;

		return (
			<div className="new_edit_form_container">
				<Link to="/admin"> Back </Link>
				
				<form onSubmit={this.createNewProduct} className="new_edit_form">
					<label>
						<strong>Name:</strong>
					</label>
					<input type="text" name="name" value={name} onChange={this.handleChange} />

					<label>
						<strong>Description:</strong>
					</label>
					<input type="text" name="description" value={description} onChange={this.handleChange} />

					<label>
						<strong>Price:</strong>
					</label>
					<input type="number" name="price" value={price} onChange={this.handleChange} />

				<input type="submit" value="Add new product" className="new_edit_send" />

				</form>
			</div>
		);
	}
}

export default NewProductForm;
