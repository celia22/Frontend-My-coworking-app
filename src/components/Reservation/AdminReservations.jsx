import { Component, React } from 'react';
import './ReservationCard.css';
import apiService from '../../lib/apiService';
import { Redirect } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';
import Dates from '../../helpers/Dates';

class AdminReservations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reservations: [],
			products: [],
		};
	}

	async componentDidMount() {
		try {
			const allReservations = await apiService.getAllReservationsAdmin();
			this.setState({
				reservations: allReservations,
			});
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		const { reservations } = this.state;
		return (
			<>
				{this.props.user.role === 'admin' ? (
					<div className="admin_reservations_container">
						<h2>Your reservations</h2>
						<div className="space_card_scroll">
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
				) : (
					<Redirect to="user/main" />
				)}
			</>
		);
	}
}

export default withAuth(AdminReservations);
