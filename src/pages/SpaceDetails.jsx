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
		console.log("space id", space._id, "products", products)
		return (
			<>
       <Link to={"/user/main"}> Back </Link>

				<h1>Space details</h1>
      <div>
				<h4>Name: {space.spaceName}</h4>
				<h4>Type: {space.spaceType}</h4>
				<img className="space_details_image" src={space.imageUrlSpace}></img>
				<h4>Price:</h4>
				{/* <h5>Daily: {space.price.daily}</h5>
				<h5>Weekly: {space.price.weekly}</h5>
				<h5>Monthly: {space.price.monthly}</h5> */}

			< ProductsCard products={products}/> 
			</div>
      </>
		);
	}
}

export default SpaceDetails;
