import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import './styles/UserMenu.css';
import Favourites from '../components/Favourites/Favourites';

class UserMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reservations: [],
		};
	}

	render() {
		console.log('user form user menu', this.props);
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

					<button className="user_menu_button">
						{' '}
						<Link to="/user/myreservations" className="button_link">
							Check my reservations{' '}
						</Link>{' '}
					</button>
				</div>

				<Favourites />
			</div>
		);
	}
}

export default withAuth(UserMenu);
