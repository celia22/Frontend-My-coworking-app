import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import './styles/buttons.css';

class Admin extends Component {
	render() {
		return (
			<>
				<h1>Welcome to your admin page</h1>
				<div className="admin_page_button_container">
					<button className="new_button">
						<Link to="/product/new" className="button_link">
							Add product
						</Link>
					</button>
					<button className="new_button">
						<Link to="/space/new" className="button_link">
							Add space
						</Link>
					</button>
					<button className="edit_button">
						<Link to="/product/all/edit" className="button_link">
							Edit product
						</Link>
					</button>
					<button className="edit_button">
						<Link to="/space/all/edit" className="button_link">
							Edit space
						</Link>
					</button>
					<button className="new_button">
						<Link to="/reservations/admin/all" className="button_link">
							View reservations
						</Link>
					</button>
				</div>
			</>
		);
	}
}

export default withAuth(Admin);
