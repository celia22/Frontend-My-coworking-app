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
		};
	}

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

	componentDidUpdate(prevProps) {
		if (prevProps.totalAmount !== this.state.totalAmount) {
			this.setState({
				totalAmount: this.props.totalAmount,
			});
		}
	}

	render() {
		const { spaces, products, productPrices, spacePrices } = this.state;
		console.log('length', spaces.length);

		return (
			<>
				{spaces.length === 0 || products.length === 0 ? (
					<h1> Your cart is empty</h1>
				) : (
					<>
						<table>
							<tbody>
								<tr>
									<th>Item</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Total</th>
								</tr>

								{spaces.map((item, index) => {
									return (
										<tr key={index}>
											<td className="cart_item_name_container">
												<p>{item.spaceName}</p>
											</td>
											<td>
												<button onClick={() => this.props.lessSpaces(item)} className="cart_less_button">
													-
												</button>
												{item.quantity}
												<button className="cart_more_button" onClick={() => this.props.moreSpaces(item)}>
													+
												</button>
											</td>

											<td>{spacePrices[index]}</td>
											<td>{spacePrices[index] * item.quantity}</td>
										</tr>
									);
								})}

								{products.map((item, index) => {
									return (
										<tr key={index}>
											<td className="cart_item_name_container">
												<p>{item.productDescription}</p>
											</td>
											<td>
												<button onClick={() => this.props.lessProducts(item)} className="cart_less_button">
													-
												</button>
												{item.quantity}
												<button className="cart_more_button" onClick={() => this.props.moreProducts(item)}>
													+
												</button>
											</td>

											<td>{productPrices[index]}</td>
											<td>{productPrices[index] * item.quantity}</td>
										</tr>
									);
								})}
							</tbody>
						</table>

						<p>Total Amount: {this.props.totalAmount} €</p>
						<button onClick={this.handleFormSubmit} className="cart_confirm_button">
							Confirm reservation
						</button>
					</>
				)}
			</>
		);
	}
}
export default withAuth(withCart(Cart));
