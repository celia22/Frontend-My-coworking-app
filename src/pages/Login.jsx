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

	render() {
		const { email, password } = this.state;
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
					<input className="new_edit_send" type="submit" value="Login" />
				</form>
			</div>
		);
	}
}

export default withAuth(Login);
