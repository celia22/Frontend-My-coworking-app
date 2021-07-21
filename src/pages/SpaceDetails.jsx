import React, { Component } from 'react';
import apiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import './styles/SpaceDetails.css';

const element = <FontAwesomeIcon icon={faCartArrowDown} color="black" />;

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
		console.log(space, 'products', products);
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

					<div className="space_details_price_container">
						<h4 className="space_details_price_title">Price</h4>
						<div className="space_details_price_details">
							<h5>Daily: </h5>
							<p>
								{space.daily} € {element}
							</p>
						</div>
						<div className="space_details_price_details">
							<h5>Weekly: </h5>
							<p>
								{space.weekly} € {element}
							</p>
						</div>
						<div className="space_details_price_details">
							<h5>Monthly: </h5>
							<p>
								{space.monthly} € {element}
							</p>
						</div>
					</div>

					<h4>Services:</h4>
					<div className="space_details_services_container">
						{products.map((item, index) => {
							return (
								<div key={index} className="space_details_services_item ">
									<p>
										{item.description} {item.price} € {element}
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

export default SpaceDetails;
