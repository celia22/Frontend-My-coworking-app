import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import ReservationCard from '../components/Reservation/ReservationCard';
import './styles/buttons.css';

const UserMenu = props => {
	console.log('user props', props.user.role);

	return (
		<div className="user_menu_container">
			{props.user.role === 'admin' ? (
				<button>
					<Link className="admin_nav_link" to={'/admin'}>
						Admin Options
					</Link>
				</button>
			) : (
				' '
			)}

			<Link to={'/user/main'} className="back_button">
				{' '}
				&laquo; Back{' '}
			</Link>

			<button className="edit_button">
				{' '}
				<Link to="/user/:id/update-profile" className="button_link">
					Edit or Delete Account{' '}
				</Link>{' '}
			</button>

			<ReservationCard user={props.user._id} />

			{/* call my payments (BG) */}
		</div>
	);
};

export default withAuth(UserMenu);
