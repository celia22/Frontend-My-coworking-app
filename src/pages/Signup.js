import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {
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
		this.props.signup({ email, password, firstName, lastName, city });
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { email, password, firstName, lastName, city } = this.state;
		return (
			<div>
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
					<input type="submit" value="Signup" />
				</form>
				<p>
					Already have account?
					<Link to={'/login'}> Login</Link>
				</p>
			</div>
		);
	}
}

export default withAuth(Signup);
