import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

function AnonRoute({ component: Component, isLoggedIn, ...rest }) {
	return (
		<Route {...rest} render={props => (!isLoggedIn ? <Component {...props} /> : <Redirect to="user/:id/main" />)} />
	);
}

export default withAuth(AnonRoute);
