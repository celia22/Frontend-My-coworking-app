import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
// import ReservationCard from '../components/Reservation/ReservationCard';
import './styles/UserMenu.css';
import apiService from '../lib/apiService';

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

				<div className="reservation_cards_container">{/* <ReservationCard user={this.props.user._id} /> */}</div>
				{reservations.map((reservation, index) => {
					return (
						<div key={reservation._id}>
							<h2>Reservation from {reservation.created_at}</h2>
							{reservation.spaces.map(item => {
								return <p key={item._id}>{item.spaceName}</p>;
							})}
							{reservation.products.map(item => {
								return <p key={item._id}>{item.productDescription}</p>;
							})}
						</div>
					);
				})}
				{/* call my payments (BG) */}
			</div>
		);
	}
}

export default withAuth(UserMenu);
