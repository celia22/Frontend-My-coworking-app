import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import ReservationCard from '../components/Reservation/ReservationCard';
import './styles/UserMenu.css';

const UserMenu = props => {
	return (
		<div className="user_menu_container">
			<div className="user_menu_buttons_container">
				<Link to={'/user/main'} className="back_button">
					{' '}
					&laquo; Back{' '}
				</Link>

				{props.user.role === 'admin' ? (
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
					<Link to="/user/:id/update-profile" className="button_link">
						Edit or Delete Account{' '}
					</Link>{' '}
				</button>
			</div>

			<div className="reservation_cards_container">
				<ReservationCard user={props.user._id} />
			</div>

			{/* call my payments (BG) */}
		</div>
	);
};

export default withAuth(UserMenu);
