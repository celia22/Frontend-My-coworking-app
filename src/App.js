import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';
import AnonRoute from './components/AnonRoute';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { withAuth } from './providers/AuthProvider';
import NewSpaceForm from './components/Space/NewSpaceForm';
import WelcomePage from './pages/WelcomePage';
import Admin from './pages/Admin';
import UserMainPage from './pages/UserMainPage';
import UserMenu from './pages/UserMenu';
import EditUserAccount from './components/User/EditUserAccount';
import SpaceDetails from './pages/SpaceDetails';
import NewProductForm from './components/Products/NewProductForm';
import EditSpaceForm from './components/Space/EditSpaceForm';
import NotFound from './pages/NotFound';
import AllSpacesToEdit from './pages/AllSpacesToEdit';
import AllProductsToEdit from './pages/AllProductsToEdit';
import EditProductForm from './components/Products/EditProductForm';
import Cart from './components/Reservation/Cart';
import AdminReservations from './pages/AdminReservations';

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
					<PrivateRoute path="/reservations/admin/all" component={AdminReservations} />
					<PrivateRoute path="/reservations/:id/new" component={Cart} />
					<PrivateRoute path="/product/all/edit" component={AllProductsToEdit} />
					<PrivateRoute path="/space/all/edit" component={AllSpacesToEdit} />
					<PrivateRoute path="/product/:id/edit" component={EditProductForm} />
					<PrivateRoute path="/space/:id/edit" component={EditSpaceForm} />
					<PrivateRoute path="/space/:id/details" component={SpaceDetails} />
					<PrivateRoute exact path="/user/:id/update-profile" component={EditUserAccount} />
					<PrivateRoute exact path="/user/:id/menu" component={UserMenu} />
					<PrivateRoute exact path="/user/main" component={UserMainPage} />
					<PrivateRoute path="/space/new" component={NewSpaceForm} />
					<PrivateRoute exact path="/product/new" component={NewProductForm} />
					<PrivateRoute exact path="/admin" component={Admin} />
					<AnonRoute path="/signup" component={Signup} />
					<AnonRoute path="/login" component={Login} />
					<Route path="/" exact component={WelcomePage} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		);
	}
}

export default withAuth(App);
