import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
							_id={value._id}
							totalAmount={value.totalAmount}
							addItemToCart={value.addItemToCart}
							resetCart={value.resetCart}
							updateQuantity={value.updateQuantity}
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

		const index = cartItems.findIndex(
			x => x.spaceName === item.spaceName && x.productDescription === item.productDescription
		);
		if (index === -1) {
			cartItems.push(item);
			cartPrices.push(price);
		}
		toast('Item added to cart');
		const totalAmount = cartPrices.reduce((a, b) => a + b, 0);
		this.setState({
			cart: cartItems,
			prices: cartPrices,
			totalAmount: totalAmount,
		});
	};

	updateQuantity = item => {
		const cartPrices = this.state.prices;
		const cartItems = this.state.cart;
		item.quantity = item.quantity + 1;

		const finalPrice = cartPrices.map((item, index) => {
			return item * cartItems[index].quantity;
		});

		const totalAmount = finalPrice.reduce((a, b) => a + b, 0);
		this.setState({
			totalAmount: totalAmount,
		});
	};

	resetCart = () => {
		this.setState({
			cart: [],
			prices: [],
			totalAmount: undefined,
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
					resetCart: this.resetCart,
					updateQuantity: this.updateQuantity,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default CartProvider;
