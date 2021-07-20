import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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


	handleFormSubmit = async event => {
		event.preventDefault();
		const { _id } = this.props.user;
		const { email, password, firstName, lastName, city } = this.state;
		try{
			apiClient.updateProfile({ email, password, firstName, lastName, city }, _id);
		}  catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/user/:id/menu' });
		}	
	
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		console.log("props en edit user", this.props)
		const { user } = this.props;
		const { email, password, firstName, lastName, city } = this.state;
		return (
			<div>
				 <Link to={"/user/main"}> Back </Link>
      
				<div className="new_edit_form_container">
					<h2>Update your data! </h2>
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
			</div>
		);
	}
}

export default withAuth(EditUserAccount);
