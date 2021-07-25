import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../lib/apiService';

class EditProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: ' ',
			price: 0,
		};
	}

	editProduct = async event => {
		event.preventDefault();
		const { id } = this.props.match.params;
		const { description, price } = this.state;
		try {
			const editProduct = await apiService.editProduct({ description, price }, id);
			this.setState({
				description,
				price,
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
		const { description, price } = this.state;

		return (
			<div className="new_edit_form_container">
				<Link to="/admin" className="back_button">
					{' '}
					&laquo; Back
				</Link>

				<form onSubmit={this.editProduct} className="new_edit_form">
					<label>
						<strong>Description:</strong>
					</label>
					<input type="text" name="description" value={description} onChange={this.handleChange} />

					<label>
						<strong>Price:</strong>
					</label>
					<input type="number" name="price" value={price} onChange={this.handleChange} />

					<input type="submit" value="Edit product" className="new_edit_send" />
				</form>
			</div>
		);
	}
}

export default EditProductForm;
