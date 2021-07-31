import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
// import ReservationCard from '../components/Reservation/ReservationCard';
import './styles/UserMenu.css';
import apiService from '../lib/apiService';
import Dates from '../helpers/Dates';

class UserMenu extends Component {
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
		const { reservations } = this.state;
		console.log(this.state.reservations);
		return (
			<div className="user_menu_container">
				<Link to={'/user/main'} className="back_button_user_menu">
					{' '}
					&laquo; Back{' '}
				</Link>
				<div className="user_menu_buttons_container">
					{this.props.user.role === 'admin' ? (
						<button className="user_menu_button">
							<Link className="button_link" to={'/admin'}>
								Admin Options
							</Link>
						</button>
					) : (
						' '
					)}

					<button className="user_menu_button">
						{' '}
						<Link to="/user/update-profile" className="button_link">
							Edit or Delete Account{' '}
						</Link>{' '}
					</button>
				</div>

				<div className="reservation_cards_container">
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
			</div>
		);
	}
}

export default withAuth(UserMenu);
