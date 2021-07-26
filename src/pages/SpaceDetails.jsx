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
			const { _id, spaceParams, spaceName, spaceType, city, daily, weekly, monthly, imgUrlSpace } = singleSpace;
			const getProducts = await apiService.getAllproducts();
			this.setState({
				_id,
				spaceParams,
				spaceName,
				spaceType,
				city,
				daily,
				weekly,
				monthly,
				imgUrlSpace,
				products: getProducts,
			});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		console.log('props en details', this.props.match.params.id);
		//	const spaceId = this.props.match.params.id;

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
							<button className="add_item_button" onClick={() => this.props.addItemToCart(this.state, daily)}>
								{daily} € {element}
							</button>
						</div>
						<div className="space_details_price_details">
							<p>Weekly:</p>
							<button className="add_item_button" onClick={() => this.props.addItemToCart(this.state, weekly)}>
								{weekly} € {element}
							</button>
						</div>
						<div className="space_details_price_details">
							<p>Monthly:</p>
							<button className="add_item_button" onClick={() => this.props.addItemToCart(this.state, monthly)}>
								{monthly} € {element}
							</button>
						</div>
					</div>

					<h4 className="space_details_content_title">Services:</h4>
					<div className="space_details_services_container">
						{products.map((item, index) => {
							return (
								<div key={index} className="space_details_services_item ">
									<p>{item.productDescription}</p>
									<button className="add_item_button" onClick={() => this.props.addItemToCart(item, item.productPrice)}>
										{item.productPrice} € {element}
									</button>
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
