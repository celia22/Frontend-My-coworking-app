import React, { Component } from 'react';
import apiService from '../lib/apiService';

const { Consumer, Provider } = React.createContext();

export const withAuth = Comp => {
	return class WithAuth extends Component {
		render() {
			return (
				<Consumer>
					{authProvider => (
						<Comp
							isLoading={authProvider.isLoading}
							isLoggedIn={authProvider.isLoggedIn}
							isLoggedOut={authProvider.isLoggedOut}
							user={authProvider.user}
							isAdmin={authProvider.isAdmin}
							logout={authProvider.logout}
							login={authProvider.login}
							signup={authProvider.signup}
							{...this.props}
						/>
					)}
				</Consumer>
			);
		}
	};
};

class AuthProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'loading',
			user: null,
		};
	}

	async componentDidMount() {
		try {
			const user = await apiService.me();
			this.setState({
				status: 'loggedIn',
				user,
			});
		} catch (e) {
			this.setState({
				status: 'loggedOut',
				user: null,
			});
			console.log(e);
		}
	}

	login = async ({ email, password }) => {
		try {
			this.setState({
				status: 'loading',
				user: null,
			});
			const user = await apiService.login({ email, password });
			console.log('login', user);
			if (user.role === 'admin') {
				this.setState({
					status: 'loggedIn',
					user,
					isAdmin: true,
				});
			} else {
				this.setState({
					status: 'loggedIn',
					user,
					isAdmin: false,
				});
			}
		} catch (e) {
			this.setState({
				status: 'loggedOut',
				user: null,
			});
		}
	};

	signup = async ({ email, password, firstName, lastName, city }) => {
		try {
			this.setState({
				status: 'loading',
				user: null,
			});
			const user = await apiService.signup({ email, password, firstName, lastName, city });
			console.log(user);
			this.setState({
				status: 'loggedIn',
				user,
			});
		} catch (e) {
			this.setState({
				status: 'loggedOut',
				user: null,
			});
		}
	};

	logout = async () => {
		try {
			await apiService.logout();
			this.setState({
				status: 'loggedOut',
				user: null,
			});
		} catch (e) {}
	};

	render() {
		const { user, status } = this.state;

		return (
			<Provider
				value={{
					isLoading: status === 'loading',
					isLoggedIn: status === 'loggedIn',
					isLoggedOut: status === 'loggedOut',
					user,
					login: this.login,
					signup: this.signup,
					logout: this.logout,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default AuthProvider;
