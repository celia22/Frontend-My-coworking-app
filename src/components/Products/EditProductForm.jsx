import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../lib/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validateForm = errors => {
	let valid = true;
	Object.values(errors).forEach(item => item.length > 0 && (valid = false));
	return valid;
};
class EditProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productDescription: ' ',
			productPrice: ' ',
			errors: {
				productDescription: ' ',
				productPrice: ' ',
			},
			formIsValid: false,
		};
	}

	handleChange = event => {
		const { name, value } = event.target;
		const errors = this.state.errors;
		switch (name) {
			case 'productDescription':
				errors.productDescription = value.length === 0;
				break;
			case 'productPrice':
				errors.productPrice = value.length === 0;
				break;
			default:
				break;
		}

		this.setState({ errors, [name]: value });
	};

	editProduct = async event => {
		event.preventDefault();
		const { id } = this.props.match.params;
		const { productDescription, productPrice } = this.state;
		if (validateForm(this.state.errors)) {
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
		} else {
			toast.error('You have to fill all the fields');
		}
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
						<strong>Description: </strong>
					</label>
					<input type="text" name="productDescription" value={productDescription} onChange={this.handleChange} />

					<label>
						<strong>Price:</strong>
					</label>
					<input type="number" name="productPrice" value={productPrice} onChange={this.handleChange} />

					<input type="submit" value="Edit product" className="new_edit_send" />
				</form>
			</div>
		);
	}
}

export default EditProductForm;
