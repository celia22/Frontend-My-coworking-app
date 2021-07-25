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
		};
	}

	async componentDidMount() {
		const id = this.props.match.params.id;
		try {
			const singleSpace = await apiService.getSingleSpace(id);
			const { spaceName, spaceType, city, daily, weekly, monthly, imgUrlSpace } = singleSpace;
			// const getProducts = await apiService.getAllproducts();
			// console.log(singleSpace);
			this.setState({
				spaceName,
				spaceType,
				city,
				daily,
				weekly,
				monthly,
				imgUrlSpace,
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
		const { spaceName, spaceType, daily, weekly, monthly } = this.state;
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
							{/* <form onSubmit={() => this.props.addItemToCart(this.state, daily)}>
								<label>
									<h5>Daily: </h5> {daily} €
								</label>
								<input type="number" name="daily" value={daily} onChange={this.handleDailyChange} /> */}
							<button onClick={() => this.props.addItemToCart(this.state, daily)}>
								{daily} {element}
							</button>
							<button onClick={() => this.props.addItemToCart(this.state, weekly)}>
								{weekly} {element}
							</button>
							<button onClick={() => this.props.addItemToCart(this.state, monthly)}>
								{monthly} {element}
							</button>
							{/* </form> */}
						</div>

						{/* <div className="space_details_price_details">
							<form onSubmit={e => this.props.addItemToCart(e.target.value)}>
								<label>
									<h5>Weekly: </h5> {price.weekly} €
								</label>
								<input type="number" name="weekly" value={weekly} onChange={this.handleWeeklyChange} />
								<button>{element}</button>
							</form>
						</div>
						<div className="space_details_price_details">
							<form onSubmit={this.props.addItemToCart(monthly)}>
								<label>
									<h5>Monthly: </h5> {price.monthly} €
								</label>
								<input type="number" name="monthly" value={monthly} onChange={this.handleMonthlyChange} />
								<button>{element}</button>
							</form>
						</div> */}
					</div>

					<h4 className="space_details_content_title">Services:</h4>
					{/* <div className="space_details_services_container">
						{products.map((item, index) => {
							return (
								<div key={index} className="space_details_services_item ">
									<form onSubmit={e => this.props.addToCart(e.target.value)}>
										<label>
											<p>
												{item.description}: {item.price} €
											</p>
										</label>
										<input type="text" name="product" value={item} onChange={this.handleChange} />
										<button>{element}</button>
									</form>
								</div>
							);
						})}
					</div> */}
				</div>
			</>
		);
	}
}

export default withCart(SpaceDetails);
