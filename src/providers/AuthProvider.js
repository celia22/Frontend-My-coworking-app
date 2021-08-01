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
							logout={authProvider.logout}
							login={authProvider.login}
							signup={authProvider.signup}
							handleFavs={authProvider.handleFavs}
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
			favouritesArr: [],
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

	handleFavs = favouritesArr => {
		const favArr = [...this.state.favouritesArr];
		favArr.push(favouritesArr);
		this.setState({
			favouritesArr: favArr,
		});
		console.log('favs from authProv', favouritesArr);
	};

	render() {
		const { user, status, favouritesArr } = this.state;

		return (
			<Provider
				value={{
					isLoading: status === 'loading',
					isLoggedIn: status === 'loggedIn',
					isLoggedOut: status === 'loggedOut',
					user,
					favouritesArr,
					login: this.login,
					signup: this.signup,
					logout: this.logout,
					handleFavs: this.handleFavs,
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default AuthProvider;
