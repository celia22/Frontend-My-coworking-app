import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from '../providers/AuthProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon  icon={faBars} color="black" size="2x"/>

class Navbar extends Component {
	render() {
		const { user, isLoggedIn, logout } = this.props;
		return (
			<div>
				{isLoggedIn ? (
					<>
						<p> Welcome {user.firstName}</p>
						<button onClick={logout}>Logout</button>
						<Link to="/user/:id/menu">{element}</Link>						
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
						
					</>
				)}
			</div>
		);
	}
}

export default withAuth(Navbar);
