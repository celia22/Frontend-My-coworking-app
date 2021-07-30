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
			cart: this.props.cart,
			prices: this.props.prices,
			totalAmount: this.props.totalAmount,
			quantity: this.props.quantity,
		};
	}

	handleFormSubmit = async event => {
		event.preventDefault();
		const { cart, prices, totalAmount } = this.state;
		try {
			const id = this.props.user._id;
			apiService.newReservation({ cart, prices, totalAmount }, id);
			toast.success('Your reservation is confirmed');
		} catch (e) {
			console.log(e);
		} finally {
			this.props.resetCart(cart, prices, totalAmount);
			this.props.history.push({ pathname: '/user/:id/menu' });
		}
	};

	render() {
		const { cart, prices } = this.state;
		console.log('props en cart', this.props);
		return (
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
						{cart.map((item, index) => {
							return (
								<tr key={index}>
									<td className="cart_itemname_container">
										<p>
											{item.spaceName} {item.spaceType} {item.productDescription}
										</p>
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
				</table>

				<p>Total Amount: {this.props.totalAmount} €</p>
				<button onClick={this.handleFormSubmit} className="cart_confirm_button">
					Confirm reservation
				</button>
			</div>
		);
	}
}
export default withAuth(withCart(Cart));
