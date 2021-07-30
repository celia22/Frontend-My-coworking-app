import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';
import apiService from '../../lib/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validateForm = errors => {
	let valid = true;
	Object.values(errors).forEach(item => item.length > 0 && (valid = false));
	return valid;
};
class EditUserAccount extends Component {
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
		const { name, value } = event.target;
		const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
		const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
		const errors = this.state.errors;

		switch (name) {
			case 'fullName':
				errors.firstName = value.length === 0 ? toast.warn('You have to fill all the fields') : '';
				break;
			case 'lastName':
				errors.lastName = value.length === 0 ? toast.warn('You have to fill all the fields') : '';
				break;
			case 'city':
				errors.city = value.length === 0 ? toast.warn('You have to fill all the fields') : '';
				break;
			case 'email':
				errors.email = regexEmail.test(value) ? '' : toast.error('Email is not valid!');
				break;
			case 'password':
				errors.password = regexPassword.test(value)
					? ''
					: toast.error(
							'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'
					  );
				break;
			default:
				break;
		}

		this.setState({ errors, [name]: value }, () => {
			console.log(errors);
		});
	};

	handleFormSubmit = async event => {
		event.preventDefault();
		const { _id } = this.props.user;
		const { email, password, firstName, lastName, city } = this.state;
		if (validateForm(this.state.errors)) {
			try {
				apiService.updateProfile({ email, password, firstName, lastName, city }, _id);
				toast.success('Your account was succesfully updated');
			} catch (e) {
				console.log(e);
			} finally {
				this.props.history.push({ pathname: '/user/:id/menu' });
			}
		} else {
			console.error('Invalid Form');
		}
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
						<input
							type="text"
							name="email"
							value={email}
							onChange={this.handleChange}
							className="new_edit_form_input"
						/>
						<label>Password:</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={this.handleChange}
							className="new_edit_form_input"
						/>
						<label>Firstname: {user.firstName}</label>
						<input
							type="text"
							name="firstName"
							value={firstName}
							onChange={this.handleChange}
							className="new_edit_form_input"
						/>
						<label>Lastname: {user.lastName}</label>
						<input
							type="text"
							name="lastName"
							value={lastName}
							onChange={this.handleChange}
							className="new_edit_form_input"
						/>
						<label>City: {user.city}</label>
						<input type="text" name="city" value={city} onChange={this.handleChange} className="new_edit_form_input" />
						<input className="new_edit_send" type="submit" value="Edit" />
					</form>
					<button className="delete_button" onClick={() => this.deleteAccount()}>
						Delete Account
					</button>
				</div>
			</div>
		);
	}
}

export default withAuth(EditUserAccount);
