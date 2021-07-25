import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';
import apiService from '../../lib/apiService';

class EditUserAccount extends Component {
	// hay que pillar los datos del user de algun sitio para poner en el estado inicial
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			city: '',
		};
	}

	handleFormSubmit = async event => {
		event.preventDefault();
		const { _id } = this.props.user;
		const { email, password, firstName, lastName, city } = this.state;
		try {
			apiService.updateProfile({ email, password, firstName, lastName, city }, _id);
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/user/:id/menu' });
		}
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	async deleteAccount() {
		try {
			apiService.deleteAccount(this.props.user._id);
			console.log('user deleted??');
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/' });
		}
	}

	render() {
		console.log('props en edit user', this.props);

		const { user } = this.props;
		const { email, password, firstName, lastName, city } = this.state;
		return (
			<div>
				<Link to="/user/main" className="back_button">
					&laquo; Back
				</Link>

				<div className="new_edit_form_container">
					<h3>Update your data! </h3>
					<form onSubmit={this.handleFormSubmit} className="new_edit_form">
						<label>Email: {user.email}</label>
						<input type="text" name="email" value={email} onChange={this.handleChange} />
						<label>Password:</label>
						<input type="password" name="password" value={password} onChange={this.handleChange} />
						<label>Firstname: {user.firstName}</label>
						<input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
						<label>Lastname: {user.lastName}</label>
						<input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
						<label>City: {user.city}</label>
						<input type="text" name="city" value={city} onChange={this.handleChange} />
						<input className="new_edit_send" type="submit" value="Edit" />
					</form>
				</div>
				<button className="delete_button" onClick={() => this.deleteAccount()}>
					Delete Account
				</button>
			</div>
		);
	}
}

export default withAuth(EditUserAccount);
