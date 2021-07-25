import React, { Component } from "react";
// import Cart from '../pages/Cart';
// import apiService from "../lib/apiService";

const CartContext = React.createContext();
// const CartContext = createContext(undefined);
const CartProvider = CartContext.Provider;
const CartConsumer = CartContext.Consumer;

export const withCart = (Comp) => {
  return class WithCart extends Component {
    render() {
      console.log("props withCart", this.props)
      return (
        <CartConsumer>
          {
            shoppingCartProvider => (
             <Comp addToCart={shoppingCartProvider.addToCart} cart={shoppingCartProvider.cart} quantity={shoppingCartProvider.quantity} {...this.props}/>
            )
          }
        </CartConsumer>
      )
    }
  }
} 

export default class ShoppingCartProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      quantity: 1,
    }
  }
  
  addToCart(item){
  console.log(this.state)
  console.log("Adding through cart context", item)
  // try {
  //   this.setState({
	// 	cart: [...this.state.cart, item]
	// 	})
  // } catch (error){
  //   console.log(error)
  // }
		// alert("Added to cart")
  };
	
  render() {
    const { cart, quantity } = this.state;
    return (
      <CartProvider value={{ 
        addToCart: this.addToCart,
        cart,
        quantity
      }}>
        {this.props.children}
      </CartProvider>
    )
  }
}