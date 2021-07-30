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
							spaces={value.spaces}
							products={value.products}
							spacePrices={value.spacePrices}
							productPrices={value.productPrices}
							// cart={value.cart}
							// quantity={value.quantity}
							// prices={value.prices}
							// _id={value._id}
							totalAmount={value.totalAmount}
							addItemToCart={value.addItemToCart}
							resetCart={value.resetCart}
							// moreQuantity={value.moreQuantity}
							// lessQuantity={value.lessQuantity}
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
			spaces: [],
			spacePrices: [],
			products: [],
			productPrices: [],
			cart: [],
			totalAmount: undefined,
		};
	}

	componentDidMount() {
		console.log('cart did mount', this.state);
	}

	componentDidUpdate() {
		console.log('cart did update', this.state);
	}

	addItemToCart = (item, price) => {
		const cartSpaces = [...this.state.spaces];
		const cartSpacePrices = [...this.state.spacePrices];
		const cartProducts = [...this.state.products];
		const cartProductPrices = [...this.state.productPrices];
		// const prices = [...this.state.prices];
		if (item.type === 'space') {
			cartSpaces.push(item.space);
			cartSpacePrices.push(price);
			console.log('Adding space to cart');
		} else if (item.type === 'product') {
			cartProducts.push(item.product);
			cartProductPrices.push(price);
			console.log('Adding product to cart');
		}
		const totalAmount = cartSpacePrices.reduce((a, b) => a + b, 0) + cartProductPrices.reduce((a, b) => a + b, 0);
		this.setState({
			spaces: cartSpaces,
			spacePrices: cartSpacePrices,
			products: cartProducts,
			productPrices: cartProductPrices,
			totalAmount,
		});

		// const cartItems = this.state.cart;
		// const cartPrices = this.state.prices;
		// console.log('CartI', cartItems);

		// cartItems.push(item);
		// cartPrices.push(price);
		// const index = cartItems.findIndex(
		// 	x => x.spaceName === item.spaceName && x.productDescription === item.productDescription
		// );
		// if (index === -1) {
		// 	cartItems.push(item);
		// 	cartPrices.push(price);
		// }
		toast('Item added to cart');

		// this.setState({
		// 	cart: cartItems,
		// 	prices: cartPrices,
		// 	totalAmount: totalAmount,
		// });
	};

	moreQuantity = cart => {
		const cartPrices = this.state.prices;
		const cartItems = this.state.cart;

		console.log('item', cart.space.quantity);

		cart.type === 'space'
			? (cart.space.quantity = cart.space.quantity + 1)
			: (cart.products.quantity = cart.products.quantity + 1);

		// item.quantity = item.quantity + 1;

		const finalPrice = cartPrices.map((item, index) => {
			return item * cartItems[index].quantity;
		});

		const totalAmountQuantity = finalPrice.reduce((a, b) => a + b, 0);
		this.setState({
			totalAmount: totalAmountQuantity,
		});
	};

	lessQuantity = item => {
		const cartPrices = this.state.prices;
		const cartItems = this.state.cart;
		if (item.quantity < 1) {
			item.quantity = 1;
		}
		item.quantity = item.quantity - 1;

		const finalPrice = cartPrices.map((item, index) => {
			return item * cartItems[index].quantity;
		});

		const totalAmountQuantity = finalPrice.reduce((a, b) => a + b, 0);
		this.setState({
			totalAmount: totalAmountQuantity,
		});
	};

	resetCart = (spaces, products, spacePrices, productPrice, totalAmount) => {
		console.log('reset called');
		this.setState({
			spaces: [],
			spacePrices: [],
			products: [],
			productPrices: [],
			totalAmount: undefined,
		});
	};

	render() {
		const { spaces, products, spacePrices, productPrices, totalAmount } = this.state;
		return (
			<Provider
				value={{
					spaces,
					products,
					spacePrices,
					productPrices,
					totalAmount,
					addItemToCart: this.addItemToCart,
					resetCart: this.resetCart,
					// moreQuantity: this.moreQuantity,
					// lessQuantity: this.lessQuantity,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default CartProvider;
