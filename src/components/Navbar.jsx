import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from '../providers/AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import "./Navbar.css"

const element = <FontAwesomeIcon  icon={faBars} color="white" size="2x"/>

class Navbar extends Component {
	render() {
		const { user, isLoggedIn, logout } = this.props;
		return (
			<div>
				{isLoggedIn ? (
					<div className="navbar_buttons_container">
						<button onClick={logout} className="navbar_button_logout">Logout</button>
						<p> Welcome {user.firstName}</p>						
						<Link to="/user/:id/menu" className="navbar_burguer">{element}</Link>						
					</div>
				) : (
					<div className="navbar_buttons_container">

						<Link to="/login" className="navbar_button">Login</Link>
						<Link to="/signup" className="navbar_button">Signup</Link>
						
					</div>
				)}
			</div>
		);
	}
}

export default withAuth(Navbar);
