import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

const validateForm = errors => {
	let valid = true;
	Object.values(errors).forEach(item => item.length > 0 && (valid = false));
	return valid;
};
// pilla los valores del key erros, si es mayor a 0 invalida el form. Si es 0 hace que el handleformsubmit se complete

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			city: '',
			errors: {
				firstName: '',
				lastName: '',
				city: '',
				email: '',
				password: '',
			},
			formIsValid: false,
		};
	}

	handleChange = event => {
		event.preventDefault();
		const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
		const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

		const { name, value } = event.target;
		const errors = this.state.errors;

		switch (name) {
			case 'fullName':
				errors.firstName = value.length === 0 ? 'You have to fill all the fields' : '';
				break;
			case 'lastName':
				errors.lastName = value.length === 0 ? 'You have to fill all the fields' : '';
				break;
			case 'city':
				errors.city = value.length === 0 ? 'You have to fill all the fields' : '';
				break;
			case 'email':
				errors.email = regexEmail.test(value) ? '' : 'Email is not valid!';
				break;
			case 'password':
				errors.password = regexPassword.test(value)
					? ''
					: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.';
				break;
			default:
				break;
		}

		this.setState({ errors, [name]: value }, () => {
			console.log(errors);
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (validateForm(this.state.errors)) {
			const { email, password, firstName, lastName, city } = this.state;
			this.props.signup({ email, password, firstName, lastName, city });
			console.info('Valid Form');
		} else {
			console.error('Invalid Form');
		}
	};

	render() {
		const { email, password, firstName, lastName, city } = this.state;
		return (
			<div className="login_signup_container">
				<form onSubmit={this.handleFormSubmit} className="new_edit_form">
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
