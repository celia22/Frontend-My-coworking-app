import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/New_Edit.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {
				email: '',
				password: '',
				confirm_password: ' ',
			},
		};
	}

	handleFormSubmit = event => {
		event.preventDefault();
		const { email, password } = this.state;
		this.props.login({
			email,
			password,
		});
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	// validate() {
	// 	const { email, password } = this.state.email;
	// 	const errors = {};
	// 	let isValid = true;

	// 	if (!email) {
	// 		isValid = false;
	// 		errors.email = toast.warn('Please enter your email Address.');
	// 	}

	// 	if (typeof email !== 'undefined') {
	// 		const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
	// 		if (!pattern.test(email)) {
	// 			isValid = false;
	// 			errors.email = 'Please enter valid email address.';
	// 		}
	// 	}

	// 	if (!password) {
	// 		isValid = false;
	// 		errors.password = 'Please enter your password.';
	// 	}

	// 	if (!password) {
	// 		isValid = false;
	// 		errors.confirm_password = 'Please enter your confirm password.';
	// 	}

	// 	if (typeof password !== 'undefined') {
	// 		if (password.length < 6) {
	// 			isValid = false;
	// 			errors.password = 'Please add at least 6 charachter.';
	// 		}
	// 	}

	// 	if (typeof password !== 'undefined' && typeof password !== 'undefined') {
	// 		if (password.password !== password.confirm_password) {
	// 			isValid = false;
	// 			errors.password = toast.error("Passwords don't match.");
	// 		}
	// 	}

	// 	this.setState({
	// 		errors: errors,
	// 	});

	// 	return isValid;
	// }

	render() {
		// console.log('user', this.props);
		const { email, password } = this.state;
		return (
			<div className="login_signup_container">
				<form onSubmit={this.handleFormSubmit} className="new_edit_form">
					<label>Email:</label>
					<input type="text" name="email" value={email} onChange={this.handleChange} />
					<label>Password:</label>
					<input type="password" name="password" value={password} onChange={this.handleChange} />
					<input className="new_edit_send" type="submit" value="Login" />
				</form>
			</div>
		);
	}
}

export default withAuth(Login);
