import { Component, React } from 'react';
import { Link } from 'react-router-dom';
import './styles/UserReservations.css';
import apiService from '../lib/apiService';
import Dates from '../helpers/Dates';

class UserReservations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reservations: [],
		};
	}

	componentDidMount = async () => {
		try {
			const reservations = await apiService.getAllReservations();
			this.setState({
				reservations,
			});
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		console.log(this.props);
		const { reservations } = this.state;
		return (
			<div className="reservation_cards_container">
				<Link to="/user/menu" className="back_button">
					&laquo; Back
				</Link>
				<h2>Your reservations</h2>
				<div className="reservation_card_scroll">
					{reservations.map((reservation, index) => {
						return (
							<div key={reservation._id} className="reservation_card_item">
								{reservation.spaces.map(item => {
									return (
										<h4 key={item._id} className="reservation_card_item_title">
											Reserved space: &nbsp; &nbsp;
											{item.spaceName}
										</h4>
									);
								})}
								<h5>Reserved products:</h5>
								<div className="reservation_card_products">
									{reservation.products.map(item => {
										return <p key={item._id}>- {item.productDescription} &nbsp;</p>;
									})}
								</div>
								<h5>Reservation from {Dates(reservation.created_at)}</h5>
								<h5> Total price: {reservation.totalAmount} €</h5>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default UserReservations;
