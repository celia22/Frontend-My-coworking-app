import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import './styles/Admin.css';

class Admin extends Component {
	render() {
		return (
			<>
				{this.props.user.role === 'admin' ? (
					<div className="admin_page_container">
						<Link to={'/user/menu'} className="back_button">
							{' '}
							&laquo; Back{' '}
						</Link>
						<h1>Admin Dashboard</h1>
						<div className="admin_page_button_container">
							<button className="new_button">
								<Link to="/product/new" className="admin_button_link">
									Add product
								</Link>
							</button>
							<button className="edit_button">
								<Link to="/product/all/edit" className="admin_button_link">
									Edit product
								</Link>
							</button>
							<button className="new_button">
								<Link to="/space/new" className="admin_button_link">
									Add space
								</Link>
							</button>
							<button className="edit_button">
								<Link to="/space/all/edit" className="admin_button_link">
									Edit space
								</Link>
							</button>
						</div>
					</div>
				) : (
					<Redirect to="user/main" />
				)}
			</>
		);
	}
}

export default withAuth(Admin);
