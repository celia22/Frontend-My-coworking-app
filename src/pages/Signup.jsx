import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

	handleChange = event => {
		event.preventDefault();
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		const { email, password, firstName, lastName, city } = this.state;
		const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
		const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

		if (firstName === '' || lastName === '' || email === '' || password === '' || city === '') {
			toast.error('Please, fill all the fields');
		} else if (!regexEmail.test(email)) {
			toast.error('Email is not valid!');
		} else if (!regexPassword.test(password)) {
			toast.error(
				'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'
			);
		} else {
			this.props.signup({ email, password, firstName, lastName, city });
		}
	};

	render() {
		const { email, password, firstName, lastName, city } = this.state;
		return (
			<div className="login_signup_container">
				<form onSubmit={this.handleFormSubmit} className="new_edit_form">
					<label>Email:</label>
					<input type="text" name="email" value={email} onChange={this.handleChange} className="new_edit_form_input" />
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
						className="new_edit_form_input"
					/>
					<label>Firstname:</label>
					<input
						type="text"
						name="firstName"
						value={firstName}
						onChange={this.handleChange}
						className="new_edit_form_input"
					/>
					<label>Lastname:</label>
					<input
						type="text"
						name="lastName"
						value={lastName}
						onChange={this.handleChange}
						className="new_edit_form_input"
					/>
					<label>City:</label>
					<input type="text" name="city" value={city} onChange={this.handleChange} className="new_edit_form_input" />
					<input className="new_edit_send" type="submit" value="Signup" />
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
