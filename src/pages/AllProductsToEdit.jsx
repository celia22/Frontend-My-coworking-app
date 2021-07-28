import React, { Component } from 'react';
import apiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

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
			console.log('product deleted', id);
		} catch (e) {
			console.log(e);
		} finally {
			this.setState({
				products: this.state.products,
			});
		}
	}

	render() {
		const { products } = this.state;

		return (
			<div>
				<Link to={'/admin'}>&laquo; Back</Link>

				<h4 className="space_details_content_title">Services:</h4>
				<div className="space_details_services_container">
					{products.map((item, index) => {
						return (
							<div key={index} className="space_details_services_item ">
								<p>
									{item.productDescription}: {item.productPrice}
									<button className="edit_button">
										<Link to={`/product/${item._id}/edit`} className="button_link">
											Edit product
										</Link>
									</button>
								</p>
								<button className="delete_button" onClick={() => this.deleteProduct(item._id)}>
									Delete
								</button>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default withAuth(AllProductsToEdit);
