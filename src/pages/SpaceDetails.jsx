import React, { Component } from 'react';
import apiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { withCart } from '../providers/CartProvider';
import { withAuth } from '../providers/AuthProvider';
import Favourites from '../components/Favourites/Favourites';
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
			favouritesArr: [],
			heartIsClicked: false,
			singleSpace: [],
		};
	}

	async componentDidMount() {
		const id = this.props.match.params.id;
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
			});
		} catch (error) {
			console.log(error);
		}
	}

	handleLike = () => {
		this.setState({
			heartIsClicked: !this.state.heartIsClicked,
		});
		console.log(this.state.heartIsClicked);
	};

	addFav = () => {
		const { singleSpace } = this.state;
		this.props.handleFavs(singleSpace);
		console.log('favArr', singleSpace);
	};

	render() {
		const { spaceName, spaceType, daily, imgUrl, weekly, monthly, products } = this.state;

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

					<img className="space_details_image" src={imgUrl}></img>

					{!this.state.heartIsClicked ? (
						<img
							className="heart_black"
							src="/images/hearts/heart.png"
							alt="page not found"
							onClick={() => {
								this.handleLike();
								this.addFav();
							}}
						/>
					) : (
						<img
							className="heart_black"
							src="/images/hearts/red-heart.png"
							alt="page not found"
							onClick={() => {
								this.handleLike();
								this.addFav();
							}}
						/>
					)}

					<div className="space_details_price_container">
						<div className="space_details_price_details">
							<p>Daily:</p>
							<button
								className="add_item_button"
								onClick={() => this.props.addItemToCart({ type: 'space', space: this.state }, daily)}
							>
								{daily} € {element}
							</button>
						</div>
						<div className="space_details_price_details">
							<p>Weekly:</p>
							<button
								className="add_item_button"
								onClick={() => this.props.addItemToCart({ type: 'space', space: this.state }, weekly)}
							>
								{weekly} € {element}
							</button>
						</div>
						<div className="space_details_price_details">
							<p>Monthly:</p>
							<button
								className="add_item_button"
								// onClick={() => this.props.addItemToCart(this.state, monthly)}
								onClick={() => this.props.addItemToCart({ type: 'space', space: this.state }, monthly)}
							>
								{monthly} € {element}
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
										className="add_item_button"
										onClick={() => this.props.addItemToCart({ type: 'product', product: item }, item.productPrice)}
									>
										{item.productPrice} € {element}
									</button>
								</div>
							);
						})}
					</div>
				</div>
				<Favourites favArr={this.state.favouritesArr} />
			</>
		);
	}
}

export default withAuth(withCart(SpaceDetails));
