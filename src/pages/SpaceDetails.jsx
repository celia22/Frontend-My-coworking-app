import React, { Component } from 'react';
import apiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
// import  { WithCart } from '../providers/cartProvider';
import './styles/SpaceDetails.css';

const element = <FontAwesomeIcon icon={faCartArrowDown} color="black" />;

class SpaceDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			space: '',
			products: [],
			cart: [],
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

// pASAR AL PROVIDER, Y AÑADIR VIA PROPS AL ELEMENTO =>  <button onClick={this.this.props.addToCart(item)}>{element}</button>
// pasar Item para que  envíe el item y sus propiedades como objeto
	// 	addToCart = (item) => {
	// 	this.setState({
	// 		cart: [... this.state.cart, item]
	// 	})
	// 	// alert("Added to cart")
	// 	console.log(this.state.prodCart)
  // };
	



	render() {
		const { space, products } = this.state;
	
		console.log("space", space, 'products', products);
		return (
			<>
				<div>
					<div className="space_details_header">
						<button className="back_button">
							<Link to={'/user/main'}> Back </Link>
						</button>

						<h4>
							{space.spaceName} Type: {space.spaceType}
					
						</h4>
					</div>

					<img className="space_details_image" src={space.imageUrlSpace}></img>

					<h4 className="space_details_content_title">Price</h4>
					<div className="space_details_price_container">
		
						<div className="space_details_price_details">
							<h5>Daily: </h5>
							<p>
								{space.daily} €  <button onClick={this.addToCart}>{element}</button>
								{/* {console.log("space.daily", space.daily)} */}
							</p>
						</div>
						<div className="space_details_price_details">
							<h5>Weekly: </h5>
							<p>
								{space.weekly} € <button onClick={this.addToCart}>{element}</button>
							</p>
						</div>
						<div className="space_details_price_details">
							<h5>Monthly: </h5>
							<p>
								{space.monthly} € <button onClick={this.addToCart}>{element}</button>
							</p>
						</div>
					</div>

					<h4 className="space_details_content_title">Services:</h4>
					<div className="space_details_services_container">
						{products.map((item, index) => {
							return (
								<div key={index} className="space_details_services_item ">
									<p>
										{item.description}:  {item.price} € <button >{element}</button>
										{/* {item.description}:  {item.price} € <button onClick={this.props.addToCart(item)}>{element}</button> */}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</>
		);
	}
	 
}


// export default WithCart(SpaceDetails);
export default SpaceDetails;