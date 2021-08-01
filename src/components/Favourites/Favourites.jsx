import React, { Component } from 'react';
import { withAuth } from '../../providers/AuthProvider';
import apiService from '../../lib/apiService';
import { Link } from 'react-router-dom';
class Favourites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favouritesArr: [],
		};
	}

	async componentDidMount() {
		const id = this.props.user._id;
		console.log(id);
		try {
			const favArr = await apiService.getUserFavSpaces(id);
			console.log('favList: ', favArr);
			this.setState({
				favouritesArr: favArr,
			});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { favouritesArr } = this.state;
		console.log('favs', favouritesArr);
		return (
			<div className="space_card_container">
				<h2>Your favourite spaces </h2>
				<div className="space_card_scroll">
					{favouritesArr.map(item => {
						return (
							<>
								<Link to={`/space/${item._id}/details`}>
									<div key={item._id} className="space_card_item ">
										<div className="space_card_title">
											<h4>{item.spaceName}</h4>
											<h4>
												{item.spaceType} in {item.city}
											</h4>
											<h5>Prices from {item.daily} € </h5>
										</div>
										<img className="space_card_item_image" src={item.imgUrl}></img>
									</div>
								</Link>
							</>
						);
					})}
				</div>
			</div>
		);
	}
}

export default withAuth(Favourites);
