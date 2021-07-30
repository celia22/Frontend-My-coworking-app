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
			// prices: this.props.prices,
			totalAmount: this.props.totalAmount,
			// quantity: this.props.quantity,
		};
	}

	// componentDidMount = () => {
	// 	const cartSpaces = this.props.cart.filter(item => item.type === 'space');
	// 	const cartProducts = this.props.cart.filter(item => item.type === 'product');
	// 	this.setState({
	// 		spaces: cartSpaces,
	// 		products: cartProducts,
	// 	});
	// };

	handleFormSubmit = async event => {
		event.preventDefault();
		const { spaces, products, totalAmount } = this.state;
		try {
			// const id = this.props.user._id;
			await apiService.newReservation({ spaces, products, totalAmount });
			toast.success('Your reservation is confirmed');
		} catch (e) {
			console.log(e);
		} finally {
			// this.props.resetCart(cart, prices, totalAmount);
			this.props.history.push({ pathname: `/user/menu` });
		}
	};

	render() {
		const { spaces, spacePrices, products, productPrices } = this.state;
		// console.log('Cart state on render:', this.state);
		return (
			<>
				<h2>Cart items:</h2>
				<div className="cart_container">
					<div className="left-column">
						<h5>Your spaces</h5>
						{spaces.map((item, index) => {
							return <p key={index}>{item.spaceName}</p>;
						})}
						<h5>Your products</h5>
						{products.map((item, index) => {
							return <p key={index}>{item.productDescription}</p>;
						})}
					</div>
					<div className="right-column">
						<h5>Space prices:</h5>
						{spacePrices.map((item, index) => {
							return <p key={index}>{item} €</p>;
						})}
						<h5>Product prices:</h5>
						{productPrices.map((item, index) => {
							return <p key={index}>{item} €</p>;
						})}
					</div>
					{/* CODIGO ANTERIOR
			<div className="cart_container">
				<h3> Your reservation</h3>
				<table>
					<tbody>
						<tr>
							<th>Item</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Total</th>
						</tr>
						{spaces.map((item, index) => {
							return (
								<tr key={index}>
									<td className="cart_itemname_container">
										 {item.type === 'space' ? console.log('blooo') : ' '} 

										<p>{item.spaceName}</p>
									</td>
									 <td>{prices[index]} € </td> 
									 <td>
										<button onClick={() => this.props.lessQuantity(item)} className="cart_less_button">
											-
										</button>
										{item.quantity}
										<button onClick={() => this.props.moreQuantity(item)} className="cart_more_button">
											+
										</button>
									</td>
									<td>{prices[index] * item.quantity} € </td>
								</tr>
							);
						})}
						{products.map((item, index) => {
							return (
								<tr key={index}>
									<td className="cart_itemname_container">
										<p>{item.productDescription}</p>
									</td>
									<td>{prices[index]} € </td> 
							    <td>
										<button onClick={() => this.props.lessQuantity(item)} className="cart_less_button">
											-
										</button>
										{item.quantity}
										<button onClick={() => this.props.moreQuantity(item)} className="cart_more_button">
											+
										</button>
									</td>
									<td>{prices[index] * item.quantity} € </td> 
								</tr>
							);
						})}
					 </tbody>
				</table> */}
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
