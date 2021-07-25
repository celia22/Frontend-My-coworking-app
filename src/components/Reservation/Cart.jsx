import React, { Component } from 'react';
import { withAuth } from '../../providers/AuthProvider';
import { withCart } from '../../providers/CartProvider';
// import { Link } from 'react-router-dom';
// import apiService from '../lib/apiService';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: this.props.cart,
			prices: this.props.prices,
			totalAmount: this.props.totalAmount,
		};
	}
	// HAY QUE HACER APLI SERVICE PARA PASAR LA NEW RESERVATION AL BACK

	render() {
		const { cart, prices, totalAmount } = this.state;

		console.log('cart state', this.state.cart);

		return (
			<div>
				<h3>Reservation</h3>
				<tr>
					<th>Item</th>
					<th>Price</th>
				</tr>
				<tr>
					<td>
						{cart.map((item, index) => {
							if (typeof item[index] === 'string') {
								return <p key={index}>{item}</p>;
							} else {
								return (
									<p key={index}>
										{item.spaceName} Type: {item.spaceType}
									</p>
								);
							}
						})}
					</td>
					<td>
						{prices.map((item, index) => {
							return <p key={index}>{item}</p>;
						})}
					</td>
				</tr>

				<p>Total Amount: {totalAmount} €</p>
			</div>
		);
	}
}

export default withAuth(withCart(Cart));
