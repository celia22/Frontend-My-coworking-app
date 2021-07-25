import React, { Component } from 'react';
import { withAuth } from '../../providers/AuthProvider';
import { withCart } from '../../providers/CartProvider';
// import { Link } from 'react-router-dom';
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
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/user/:id/menu' });
		}
	};

	render() {
		const { cart, prices, totalAmount } = this.state;
		console.log('props en cart', this.props);
		return (
			<div>
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
					</tbody>
				</table>

				<p>Total Amount: {totalAmount} €</p>
				<button onClick={this.handleFormSubmit}> Comfirm reservation </button>
			</div>
		);
	}
}

export default withAuth(withCart(Cart));
