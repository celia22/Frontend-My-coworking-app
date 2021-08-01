import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../lib/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NewProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productDescription: ' ',
			productPrice: ' ',
			quantity: 1,
		};
	}

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	createNewProduct = async event => {
		event.preventDefault();
		console.log('error', this.state.errors);
		const { productDescription, productPrice } = this.state;
		if (productDescription === ' ' || productPrice === ' ') {
			toast.error('You have to fill all the fields');
		} else {
			try {
				await apiService.newProduct({ productDescription, productPrice });
				toast.success('New product added');
			} catch (e) {
				console.log(e);
			} finally {
				this.props.history.push({ pathname: '/admin' });
			}
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
					<input
						type="text"
						name="productDescription"
						value={productDescription}
						onChange={this.handleChange}
						className="new_edit_form_input"
					/>

					<label>
						<strong>Price:</strong>
					</label>
					<input
						type="number"
						name="productPrice"
						value={productPrice}
						onChange={this.handleChange}
						className="new_edit_form_input"
					/>

					<input type="submit" value="Add product" className="new_edit_send" />
				</form>
			</div>
		);
	}
}

export default NewProductForm;
