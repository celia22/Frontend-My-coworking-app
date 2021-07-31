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
							lessSpaces={value.lessSpaces}
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
		this.updatePrice();
	};

	lessSpaces = item => {
		if (item.quantity < 1) {
			item.quantity = 1;
		}
		item.quantity = item.quantity - 1;

		this.updatePrice();
	};

	moreProducts = item => {
		item.quantity = item.quantity + 1;
		this.updatePrice();
	};

	lessProducts = item => {
		if (item.quantity < 1) {
			item.quantity = 1;
		}
		item.quantity = item.quantity - 1;
		this.updatePrice();
	};

	updatePrice = () => {
		const cartSpaces = [...this.state.spaces];
		const cartSpacePrices = [...this.state.spacePrices];
		const cartProducts = [...this.state.products];
		const cartProductPrices = [...this.state.productPrices];

		const updateProds = cartProductPrices.map((item, index) => {
			return item * cartProducts[index].quantity;
		});

		const updateSpaces = cartSpacePrices.map((item, index) => {
			return item * cartSpaces[index].quantity;
		});

		const totalAmount2 = updateProds.reduce((a, b) => a + b, 0) + updateSpaces.reduce((a, b) => a + b, 0);

		this.setState({
			totalAmount: totalAmount2,
		});
	};

	resetCart = () => {
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
					lessSpaces: this.lessSpaces,
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
