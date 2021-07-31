import React, { Component } from 'react';
import { withAuth } from '../../providers/AuthProvider';
import { withCart } from '../../providers/CartProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';

import apiService from '../../lib/apiService';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spaces: this.props.spaces,
			products: this.props.products,
			spacePrices: this.props.spacePrices,
			productPrices: this.props.productPrices,
			totalAmount: this.props.totalAmount,
			// quantity: this.props.quantity,
		};
	}

	// componentDidMount = () => {
	// 	const cartSpaces = this.props.spaces.filter(item => item.type === 'space');
	// 	const cartProducts = this.props.products.filter(item => item.type === 'product');
	// 	this.setState({
	// 		spaces: cartSpaces,
	// 		products: cartProducts,
	// 	});
	// };

	handleFormSubmit = async event => {
		event.preventDefault();
		const { spaces, products, totalAmount } = this.state;
		try {
			await apiService.newReservation({ spaces, products, totalAmount });
			toast.success('Your reservation is confirmed');
		} catch (e) {
			console.log(e);
		} finally {
			this.props.resetCart();
			this.props.history.push({ pathname: `/user/menu` });
		}
	};

	render() {
		const { spaces, spacePrices, products, productPrices } = this.state;

		return (
			<>
				<h2>Cart items:</h2>
				<div className="cart_container">
					<div className="left-column">
						<h5>Your items: </h5>
						{spaces.map((item, index) => {
							return (
								<div key={index} className="button_container">
									<p>{item.spaceName}</p>
									<button onClick={() => this.props.lessSpaces(item)} className="cart_less_button">
										-
									</button>
									{item.quantity}
									<button className="cart_more_button" onClick={() => this.props.moreSpaces(item)}>
										+
									</button>
								</div>
							);
						})}
						{products.map((item, index) => {
							return (
								<div key={index} className="button_container">
									<p>{item.productDescription}</p>
									<button onClick={() => this.props.lessProducts(item)} className="cart_less_button">
										-
									</button>
									{item.quantity}
									<button onClick={() => this.props.moreProducts(item)} className="cart_more_button">
										+
									</button>
								</div>
							);
						})}
					</div>
					<div className="right-column">
						<h5>Prices: </h5>
						{spacePrices.map((item, index) => {
							return <p key={index}>{item} €</p>;
						})}
						{productPrices.map((item, index) => {
							return <p key={index}>{item} €</p>;
						})}
					</div>
				</div>
				<p>Total Amount: {this.props.totalAmount} €</p>
				<button onClick={this.handleFormSubmit} className="cart_confirm_button">
					Confirm reservation
				</button>
			</>
		);
	}
}
export default withAuth(withCart(Cart));
