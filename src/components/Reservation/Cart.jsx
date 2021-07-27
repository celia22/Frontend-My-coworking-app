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
		};
	}

	handleFormSubmit = async event => {
		event.preventDefault();
		try {
			const { cart, prices, totalAmount } = this.state;
			const id = this.props.user._id;
			apiService.newReservation({ cart, prices, totalAmount }, id);
			toast.success('Your reservation is confirmed');
		} catch (e) {
			console.log(e);
		} finally {
			this.setState({
				cart: ' ',
				prices: ' ',
				totalAmount: ' ',
			});
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
							<td>
								{cart.map((item, index) => {
									return (
										<p key={index}>
											{item.spaceName} {item.spaceType} {item.productDescription}
										</p>
									);
								})}
							</td>
							<td>
								{prices.map((item, index) => {
									return <p key={index}>{item}</p>;
								})}
							</td>
						</tr>
					</tbody>
				</table>

				<p>Total Amount: {totalAmount} €</p>
				<button onClick={this.handleFormSubmit} className="cart_confirm_button">
					{' '}
					Confirm reservation{' '}
				</button>
			</div>
		);
	}
}

export default withAuth(withCart(Cart));
