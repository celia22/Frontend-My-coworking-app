import React, { Component } from 'react';
import apiService from '../../lib/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { withCart } from '../../providers/CartProvider';
// import './styles/SpaceDetails.css';

const element = <FontAwesomeIcon icon={faCartArrowDown} color="black" />;

class ProductsCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [
				{
					productDescription: ' ',
					productPrice: ' ',
					quantity: 1,
				},
			],
		};
	}

	async componentDidMount() {
		try {
			const getProducts = await apiService.getAllproducts();
			// const { products:
			// 	{
			// 		productDescription,
			// 		productPrice,
			// 	},
			// } = getProducts;

			this.setState({
				products: getProducts,
			});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { products } = this.state;
		console.log('prod card', products);
		return (
			<>
				<h5 className="space_details_services_title">Add your extra services!</h5>
				<div className="space_details_services_container">
					{products.map((item, index) => {
						return (
							<div key={index} className="space_details_services_item ">
								<p>{item.products.productDescription}</p>
								<button className="add_item_button" onClick={() => this.props.addItemToCart(item, item.productPrice)}>
									{item.products.productPrice} € {element}
								</button>
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

export default withCart(ProductsCard);
