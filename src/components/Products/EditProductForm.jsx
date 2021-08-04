import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../lib/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productDescription: ' ',
			productPrice: ' ',
		};
	}

	handleChange = event => {
		event.preventDefault();
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	editProduct = async event => {
		event.preventDefault();
		const { id } = this.props.match.params;
		const { productDescription, productPrice } = this.state;
		if (productDescription === ' ' || productPrice === ' ') {
			toast.error('You have to fill all the fields');
		} else {
			try {
				await apiService.editProduct({ productDescription, productPrice }, id);
				this.setState({
					productDescription,
					productPrice,
				});
				toast.success('Product successfully edited');
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

				<form onSubmit={this.editProduct} className="new_edit_form">
					<label>
						<strong>Description: </strong>
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

					<input type="submit" value="Edit product" className="new_edit_send" />
				</form>
			</div>
		);
	}
}

export default EditProductForm;
