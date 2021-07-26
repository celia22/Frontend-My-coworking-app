import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../lib/apiService';
class NewProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productDescription: ' ',
			productPrice: 0,
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
		const { productDescription, productPrice } = this.state;
		try {
			await apiService.newProduct({ productDescription, productPrice });
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/admin' });
		}
	};

	render() {
		const { productDescription, productPrice } = this.state;

		return (
			<div className="new_edit_form_container">
				<Link to="/admin" className="back_button">
					{' '}
					&laquo; Back
				</Link>

				<form onSubmit={this.createNewProduct} className="new_edit_form">
					<label>
						<strong>Description:</strong>
					</label>
					<input type="text" name="productDescription" value={productDescription} onChange={this.handleChange} />

					<label>
						<strong>Price:</strong>
					</label>
					<input type="number" name="productPrice" value={productPrice} onChange={this.handleChange} />

					<input type="submit" value="Add new product" className="new_edit_send" />
				</form>
			</div>
		);
	}
}

export default NewProductForm;
