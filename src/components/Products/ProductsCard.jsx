import React, { Component } from 'react';

// import './SpaceCard.css';

class ProductsCard extends Component {
  constructor(props){
    super(props)
    this.state={
      products: []
    }
  }

	componentDidMount(){
		this.setState({
			products: this.props.products
		})
	}

render(){
  const { products } = this.state
console.log("prod card", products)
  	return (
		<>
			<h2>Products</h2>
			<div className="space_card_scroll">
				{products.map(item => {
					return (
						<>
							<div key={item._id} className="product_card_item ">
								<h4>SpaceName: {item.spaceName}</h4>
									<h4>Description: {item.description}</h4>
									<h5>Price: {item.price}</h5>
									<h5>Amount: {item.amount}</h5>
							</div>
						</>
					);
				})}
			</div>
		</>
	);

}

};

export default ProductsCard;
