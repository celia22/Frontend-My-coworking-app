import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
// import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { withAuth } from './providers/AuthProvider';
import NewSpaceForm from './components/space/NewSpaceForm';
import MainPage from './pages/MainPage';
import Admin from './pages/Admin';

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
					<AnonRoute path="/signup" component={Signup} />
					<AnonRoute path="/login" component={Login} />
					<PrivateRoute path="/user/main" component={MainPage} />
					<PrivateRoute path="/admin" component={Admin} />
					<PrivateRoute path="/space/new" component={NewSpaceForm} />
					{/* <PrivateRoute path="/private" component={Private} /> */}
				</Switch>
			</div>
		);
	}
}

export default withAuth(App);
