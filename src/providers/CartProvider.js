import React, { Component } from 'react';

const CartContext = React.createContext();
const CartConsumer = CartContext.Consumer;
const Provider = CartContext.Provider;

export const withCart = Comp => {
	return class WithCart extends Component {
		render() {
			return (
				<CartConsumer>
					{value => (
						<Comp
							{...this.props}
							cart={value.cart}
							quantity={value.quantity}
							prices={value.prices}
							totalAmount={value.totalAmount}
							addItemToCart={value.addItemToCart}
						/>
					)}
				</CartConsumer>
			);
		}
	};
};

class CartProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
			prices: [],
			quantity: 1,
			totalAmount: undefined,
		};
	}

	componentDidMount() {
		console.log('did mount', this.state);
	}

	componentDidUpdate() {
		console.log('did update', this.state);
	}

	addItemToCart = (item, price) => {
		const cartItems = this.state.cart;
		const cartPrices = this.state.prices;
		cartItems.push(item);
		cartPrices.push(price);
		const totalAmount = cartPrices.reduce((a, b) => a + b, 0);
		this.setState({
			cart: cartItems,
			prices: cartPrices,
			totalAmount,
		});
	};

	render() {
		const { cart, quantity, prices, totalAmount } = this.state;
		return (
			<Provider
				value={{
					cart,
					quantity,
					prices,
					totalAmount,
					addItemToCart: this.addItemToCart,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default CartProvider;
