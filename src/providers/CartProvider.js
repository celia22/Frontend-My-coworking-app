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
							totalAmount={value.totalAmount}
							addItemToCart={value.addItemToCart}
							resetCart={value.resetCart}
							moreSpaces={value.moreSpaces}
							moreProducts={value.moreProducts}
							lessProducts={value.lessProducts}
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

		toast('Item added to cart');
	};

	moreSpaces = item => {
		item.quantity = item.quantity + 1;
		// this.updatePrice()
	};

	moreProducts = item => {
		item.quantity = item.quantity + 1;
		console.log('moreprod', item, item.quantity);
		// this.updatePrice()
	};

	lessProducts = item => {
		if (item.quantity < 1) {
			item.quantity = 1;
		}
		item.quantity = item.quantity - 1;
		console.log('lessprod', item, item.quantity);
		// this.updatePrice()
	};

	updatePrice = () => {
		// const cartSpaces = [...this.state.spaces];
		const cartSpacePrices = [...this.state.spacePrices];
		const cartProducts = [...this.state.products];
		const cartProductPrices = [...this.state.productPrices];

		const finalPrice = cartProductPrices.map((item, index) => {
			return item * cartProducts[index].quantity;
		});
		const totalMultiplied = finalPrice.reduce((a, b) => a + b, 0);
		console.log('finalprice', totalMultiplied);
		console.log('spaces array', cartSpacePrices);
		const totalMultProds = parseInt(totalMultiplied) + cartSpacePrices.reduce((a, b) => a + b, 0);

		this.setState({
			totalAmount: totalMultProds,
		});
		console.log('total Amoutn', this.state.totalAmount);
	};

	lessQuantity = item => {
		// const cartPrices = this.state.prices;
		// const cartItems = this.state.cart;
		// if (item.quantity < 1) {
		// 	item.quantity = 1;
		// }
		// item.quantity = item.quantity - 1;
		// const finalPrice = cartPrices.map((item, index) => {
		// 	return item * cartItems[index].quantity;
		// });
		// const totalAmountQuantity = finalPrice.reduce((a, b) => a + b, 0);
		// this.setState({
		// 	totalAmount: totalAmountQuantity,
		// });
	};

	resetCart = () => {
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
					moreSpaces: this.moreSpaces,
					moreProducts: this.moreProducts,
					lessProducts: this.lessProducts,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default CartProvider;
