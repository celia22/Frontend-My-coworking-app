import React, { Component } from 'react';
import apiService from '../lib/apiService';
import { Link, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import './styles/AllProductsToEdit.css';

class AllProductsToEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
		};
	}

	async componentDidMount() {
		try {
			const getProducts = await apiService.getAllproducts();
			this.setState({
				products: getProducts,
			});
		} catch (error) {
			console.log(error);
		}
	}

	async deleteProduct(id) {
		try {
			await apiService.deleteProduct(id);
		} catch (e) {
			console.log(e);
		} finally {
			const products = [...this.state.products].filter(item => {
				return item._id !== id;
			});
			this.setState({
				products,
			});
		}
	}

	render() {
		const { products } = this.state;

		return (
			<>
				{this.props.user.role === 'admin' ? (
					<div>
						<Link to={'/admin'} className="edit_prods_back">
							&laquo; Back
						</Link>

						<h4 className="space_details_content_title">Services:</h4>
						<div className="space_details_services_container">
							{products.map((item, index) => {
								return (
									<div key={index} className="space_details_services_item ">
										<p>
											{item.productDescription}: {item.productPrice}
											<button className="edit_prods_button">
												<Link to={`/product/${item._id}/edit`} className="button_link">
													Edit product
												</Link>
											</button>
										</p>
										<button className="edit_prods_delete_button" onClick={() => this.deleteProduct(item._id)}>
											Delete
										</button>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<Redirect to="user/main" />
				)}
			</>
		);
	}
}

export default withAuth(AllProductsToEdit);
