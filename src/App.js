import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
// import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { withAuth } from './providers/AuthProvider';
import NewSpaceForm from './components/Space/NewSpaceForm';
import MainPage from './pages/MainPage';
import Admin from './pages/Admin';
import UserMainPage from './pages/UserMainPage';

class App extends Component {
	render() {
		const { isLoading } = this.props;
		if (isLoading) {
			return <div>loading ... </div>;
		}
		return (
			<div className="container">
				<Navbar />
				<Switch>
					<PrivateRoute path="/space/new" component={NewSpaceForm} />
					<PrivateRoute path="/user/main" component={UserMainPage} />
					<PrivateRoute path="/admin" component={Admin} />
					<AnonRoute path="/signup" component={Signup} />
					<AnonRoute path="/login" component={Login} />
					<Route path="/" component={MainPage} />
					{/* <PrivateRoute path="/private" component={Private} /> */}
				</Switch>
			</div>
		);
	}
}

export default withAuth(App);
