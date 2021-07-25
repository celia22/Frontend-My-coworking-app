import React, { Component } from 'react';
import apiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { withCart } from '../providers/CartProvider';
import './styles/SpaceDetails.css';

const element = <FontAwesomeIcon icon={faCartArrowDown} color="black" />;

class SpaceDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spaceName: '',
			spaceType: '',
			city: '',
			daily: '',
			monthly: '',
			weekly: '',
			imgUrlSpace: '',
			products: [],
			// productDescription: '',
			// productPrice: '',
		};
	}

	async componentDidMount() {
		const id = this.props.match.params.id;
		try {
			const singleSpace = await apiService.getSingleSpace(id);
			const { spaceName, spaceType, city, daily, weekly, monthly, imgUrlSpace } = singleSpace;
			const getProducts = await apiService.getAllproducts();
			// const { productDescription, productPrice } = getProducts;
			this.setState({
				spaceName,
				spaceType,
				city,
				daily,
				weekly,
				monthly,
				imgUrlSpace,
				products: getProducts,
				// productDescription,
				// productPrice,
			});
		} catch (error) {
			console.log(error);
		} finally {
			console.log(this.state);
		}
	}

	// handleDailyChange = event => {
	// 	this.setState({ price: { daily: event.target.value } });
	// 	console.log('state', this.state);
	// };

	// handleWeeklyChange = event => {
	// 	this.setState({ weekly: event.target.value });
	// };

	// handleMonthlyChange = event => {
	// 	this.setState({ monthly: event.target.value });
	// };

	// handleChange = event => {
	// 	this.setState({
	// 		name: event.target.value,
	// 	});
	// };

	render() {
		const { spaceName, spaceType, daily, weekly, monthly, products } = this.state;
		return (
			<>
				<div>
					<div className="space_details_header">
						<button className="back_button">
							<Link to={'/user/main'} className="back_button">
								&laquo; Back
							</Link>
						</button>

						<h4>
							{spaceName} Type: {spaceType}
						</h4>
					</div>

					{/* <img className="space_details_image" src={}></img> */}

					<h4 className="space_details_content_title">Price</h4>
					<div className="space_details_price_container">
						<div className="space_details_price_details">
							<p>Daily:</p>
							<button onClick={() => this.props.addItemToCart(this.state, daily)}>
								{daily} € {element}
							</button>
							<p>Weekly:</p>
							<button onClick={() => this.props.addItemToCart(this.state, weekly)}>
								{weekly} € {element}
							</button>
							<p>Monthly:</p>
							<button onClick={() => this.props.addItemToCart(this.state, monthly)}>
								{monthly} € {element}
							</button>
						</div>
					</div>

					<h4 className="space_details_content_title">Services:</h4>
					<div className="space_details_services_container">
						{products.map((item, index) => {
							return (
								<div key={index} className="space_details_services_item ">
									<p>
										{item.description}: {item.price} €
									</p>
									<button onClick={() => this.props.addItemToCart(item.description, item.price)}>{element}</button>
								</div>
							);
						})}
					</div>
				</div>
			</>
		);
	}
}

export default withCart(SpaceDetails);
