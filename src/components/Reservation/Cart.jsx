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

	// NO BORRA EL CART CUANDO HAGO LA RESERVA, LO MISMO QUE CON UPDATE DELETE COSAS, MIRAR DE
	// HACER EL COMPONENT DID UPDATE Y PREV PROPS

	render() {
		const { cart, prices, totalAmount } = this.state;
		console.log('props en cart', this.props);
		return (
			<div className="cart_container">
				<h3>Reservation</h3>
				<table>
					<tbody>
						<tr>
							<th>Item</th>
							<th>Price</th>
						</tr>
						<tr>
							{cart.map((item, index) => {
								return (
									<div key={index}>
										<td className="cart_container_name_column">
											<p>
												{item.spaceName} {item.spaceType} {item.productDescription}
											</p>
										</td>
										<td>
											<button type="number" onClick={() => this.props.updateQuantity(item)}>
												+
											</button>
											{item.quantity} - {prices[index] * item.quantity} €{' '}
										</td>
									</div>
								);
							})}
						</tr>
					</tbody>
				</table>

				<p>Total Amount: {totalAmount} €</p>
				<button onClick={this.handleFormSubmit} className="cart_confirm_button">
					Confirm reservation
				</button>
			</div>
		);
	}
}

export default withAuth(withCart(Cart));
