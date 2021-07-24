import React, { Component, createContext } from 'react';
// import apiService from "../lib/apiService";

// const { Consumer, Provider } = React.createContext();
const CartContext = createContext();

const CartConsumer = CartContext.Consumer;

export const withCart = Comp => {
	return class WithCart extends Component {
		render() {
			console.log('props withCart', this.props);
			return (
				<CartConsumer>
					{value => {
						console.log('values', value);
						return <Comp addToCart={value.addToCart} {...this.props} />;
					}}
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
			quantity: 1,
		};
	}

	addToCart = item => {
		this.setState({
			cart: [...this.state.cart, item],
		});
		// alert("Added to cart")
		console.log(this.state.prodCart);
	};

	render() {
		// const { cart, quantity } = this.state;

		return (
			<CartContext.Provider
				value={{
					addToCart: this.addToCart,
					cart: this.state.cart,
				}}
			>
				{this.props.children}
			</CartContext.Provider>
		);
	}
}

export default CartProvider;
