import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

import './Navbar.css';

const burger = <FontAwesomeIcon icon={faBars} color="white" size="2x" />;
const cart = <FontAwesomeIcon icon={faCartArrowDown} color="white" size="2x" />;

class Navbar extends Component {
	render() {
		const { user, isLoggedIn, logout } = this.props;
		return (
			<div>
				{isLoggedIn ? (
					<div className="navbar_container">
						<div className="navbar_top">
							<Link to="/user/:id/menu" className="navbar_burguer">
								{burger}
							</Link>
							<Link className="navbar_cart" to="/reservations/:id/new">
								{cart}
							</Link>
						</div>

						<div className="navbar_bottom">
							<button onClick={logout} className="navbar_button_logout">
								Logout
							</button>
							<p> Hi {user.firstName}!</p>
						</div>
					</div>
				) : (
					<div className="navbar_top">
						<Link to="/login" className="navbar_button">
							Login
						</Link>
						<Link to="/signup" className="navbar_button">
							Signup
						</Link>
					</div>
				)}
			</div>
		);
	}
}

export default withAuth(Navbar);
