import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../lib/apiService';

class EditProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productDescription: ' ',
			productPrice: 0,
		};
	}

	editProduct = async event => {
		event.preventDefault();
		const { id } = this.props.match.params;
		const { productDescription, productPrice } = this.state;
		try {
			const editProduct = await apiService.editProduct({ productDescription, productPrice }, id);
			this.setState({
				productDescription,
				productPrice,
			});
			console.log(editProduct);
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/admin' });
		}
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		const { productDescription, productPrice } = this.state;
		console.log(this.props);
		return (
			<div className="new_edit_form_container">
				<Link to="/admin" className="back_button">
					{' '}
					&laquo; Back
				</Link>

				<form onSubmit={this.editProduct} className="new_edit_form">
					<label>
						<strong>Description: {productDescription}</strong>
					</label>
					<input type="text" name="productDescription" value={productDescription} onChange={this.handleChange} />

					<label>
						<strong>Price: {productPrice}</strong>
					</label>
					<input type="number" name="productPrice" value={productPrice} onChange={this.handleChange} />

					<input type="submit" value="Edit product" className="new_edit_send" />
				</form>
			</div>
		);
	}
}

export default EditProductForm;
