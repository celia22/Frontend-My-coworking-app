import React, { Component } from "react";

const CartContext = React.createContext();
const CartConsumer = CartContext.Consumer;
const Provider = CartContext.Provider;

export const withCart = (Comp) => {
  return class WithCart extends Component {
    render(){
      return (
        <CartConsumer>
          {(value) => (
           //  <Comp cart={value.cart} />
          <Comp {...this.props} cart={value.cart} quantity={value.quantity} addItemToCart={value.addItemToCart}/>
          )}
        </CartConsumer>
      )
    }
  }
}

class CartProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      prices: [],
      quantity: 1,
      totalAmount: undefined
    }
  }

  componentDidMount(){
    console.log("did mount", this.state)
  }

  componentDidUpdate(){
    console.log('did update', this.state)
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
      totalAmount
    })
  }

  render() {
    const { cart, quantity } = this.state;

    return (
      <Provider value={
        {
          cart,
          quantity,
          addItemToCart: this.addItemToCart
        }
      }>
      {this.props.children}
      </Provider>
    )
  }
}

export default CartProvider;