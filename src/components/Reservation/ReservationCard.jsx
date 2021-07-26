import { Component, React } from 'react';
// import { Link } from 'react-router-dom';
import './ReservationCard.css';
import apiService from '../../lib/apiService';

class ReservationCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			reservations: [],
			products: [],
		};
	}

	async componentDidMount() {
		console.log('products', this.props.cart);
		try {
			const allReservations = await apiService.getAllreservations(this.props.user);
			// const cartItems = await apiService.getSingleproduct(this.props.user);
			this.setState({
				reservations: allReservations,
			});
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		console.log(this.state.reservations);
		const { reservations } = this.state;
		return (
			<>
				<div className="reservation_card_scroll">
					<h2>Your reservations</h2>

					{reservations.map(item => {
						return (
							<div key={item._id} className="reservation_card_item ">
								{/* <Link to={`/space/${item._id}/details`}> */}
								{item.cart.map((item, index) => {
									return <p key={index}>{item}</p>;
								})}
								<div>
									{item.prices.map((item, index) => {
										return <p key={index}>{item} €</p>;
									})}
									<h4>Total Amount: {item.totalAmount} €</h4>
								</div>
								{/* </Link> */}
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

export default ReservationCard;
