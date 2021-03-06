import React, { Component } from 'react';
import apiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { withCart } from '../providers/CartProvider';
import { withAuth } from '../providers/AuthProvider';
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
			imgUrl: '',
			quantity: 1,
			products: [],
			heartIsClicked: false,
		};
	}

	async componentDidMount() {
		const id = this.props.match.params.id;
		const clicked = this.props.user.favSpaces.includes(id);

		try {
			const singleSpace = await apiService.getSingleSpace(id);
			const { _id, spaceParams, spaceName, spaceType, city, daily, weekly, monthly, imgUrl } = singleSpace;
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
				imgUrl,
				products: getProducts,
				singleSpace,
				heartIsClicked: clicked,
			});
		} catch (error) {
			console.log(error);
		}
	}

	handleLike = () => {
		this.setState({
			heartIsClicked: !this.state.heartIsClicked,
		});
	};

	addFav = () => {
		const id = this.props.match.params.id;
		apiService.favSpace(id);
	};

	deleteFav = () => {
		const id = this.props.match.params.id;
		apiService.deletefavSpace(id);
	};

	render() {
		const { spaceName, spaceType, daily, imgUrl, weekly, monthly, products, heartIsClicked } = this.state;

		return (
			<>
				<div className="space_details_page">
					<div className="space_details_header">
						<Link to={'/user/main'} className="space_details_back">
							&laquo; Back
						</Link>
						<h4>
							{spaceName} Type: {spaceType}
						</h4>
					</div>
					<div className="space_details_image_container">
						<img className="space_details_image" src={imgUrl}></img>

						{!heartIsClicked ? (
							<img
								className="heart_black"
								src="/images/hearts/heart.png"
								alt="heart icon"
								onClick={() => {
									this.handleLike();
									this.addFav();
								}}
							/>
						) : (
							<img
								className="heart_black"
								src="/images/hearts/red-heart.png"
								alt="heart icon"
								onClick={() => {
									this.handleLike();
									this.deleteFav();
								}}
							/>
						)}
					</div>
					<div className="space_details_price_container">
						<div className="space_details_price_details">
							<p>Daily:</p>
							<button
								className="add_space_button"
								onClick={() => this.props.addItemToCart({ type: 'space', space: this.state }, daily)}
							>
								{daily} ??? {element}
							</button>
						</div>
						<div className="space_details_price_details">
							<p>Weekly:</p>
							<button
								className="add_space_button"
								onClick={() => this.props.addItemToCart({ type: 'space', space: this.state }, weekly)}
							>
								{weekly} ??? {element}
							</button>
						</div>
						<div className="space_details_price_details">
							<p>Monthly:</p>
							<button
								className="add_space_button"
								onClick={() => this.props.addItemToCart({ type: 'space', space: this.state }, monthly)}
							>
								{monthly} ??? {element}
							</button>
						</div>
					</div>

					<h5 className="space_details_services_title">Add your extra services!</h5>
					<div className="space_details_services_container">
						{products.map((item, index) => {
							return (
								<div key={index} className="space_details_services_item ">
									<p>{item.productDescription}</p>
									<button
										className="add_product_button"
										onClick={() => this.props.addItemToCart({ type: 'product', product: item }, item.productPrice)}
									>
										{item.productPrice} ??? {element}
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

export default withAuth(withCart(SpaceDetails));
