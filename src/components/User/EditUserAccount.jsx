import React, { Component } from 'react';
import { withAuth } from '../../providers/AuthProvider';
import apiClient from "../../lib/apiClient";

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

	handleFormSubmit = event => {
		event.preventDefault();
		const { email, password, firstName, lastName, city } = this.state;
		apiClient.updateProfile({ email, password, firstName, lastName, city });
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		console.log("props en edit user", this.props)
		const { email, password, firstName, lastName, city } = this.state;
		return (
			<div>
        <h2>Update your data! </h2>
				<form onSubmit={this.handleFormSubmit}>
					<label>Email:</label>
					<input type="text" name="email" value={email} onChange={this.handleChange} />
					<label>Password:</label>
					<input type="password" name="password" value={password} onChange={this.handleChange} />
					<label>Firstname:</label>
					<input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
					<label>Lastname:</label>
					<input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
					<label>City:</label>
					<input type="text" name="city" value={city} onChange={this.handleChange} />
					<input type="submit" value="Edit" />
				</form>
			</div>
		);
	}
}

export default withAuth(EditUserAccount);
