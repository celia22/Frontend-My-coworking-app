import React, { Component } from 'react';
import apiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import ProductsCard from '../components/Products/ProductsCard';

import "./styles/SpaceDetails.css"

class SpaceDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			space: '',
			products: [],
		};
	}

	async componentDidMount() {
		const id = this.props.match.params.id;
		try {
			const singleSpace = await apiService.getSingleSpace(id);
			const getProducts = await apiService.getAllproducts(id);
			this.setState({
				space: singleSpace,
			 products: getProducts,
			});
		} catch (error) {
			console.log(error);
		}
	}


	render() {
		const { space, products } = this.state;
		console.log(space, "products", products)
		return (
			<>
       <Link to={"/user/main"}> Back </Link>

				<h3>Space details</h3>
      <div>
				<h4>{space.spaceName} Type: {space.spaceType}</h4>
				<img className="space_details_image" src={space.imageUrlSpace}></img>
				<h4>Price:</h4>
				<h5>Daily: {space.daily}</h5>
				<h5>Weekly: {space.weekly}</h5>
				<h5>Monthly: {space.monthly}</h5> 
				<h4>Services:</h4>
				{/* {products.map((item, index) => {
						return (
							<div key={index} className="product_card_item ">
								<h4>description: {item.description}</h4>
								<h4>price: {item.price}</h4>
							</div>
						);
					})} */}
			
			  < ProductsCard products={products}/>  
			</div>
      </>
		);
	}
}

export default SpaceDetails;
