import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

function PrivateRoute({ component: Component, isLoggedIn, role, ...rest }){	

const currentUser = withAuth.history;
console.log(currentUser)

 return <Route {...rest} render={props => (isLoggedIn ? <Component {...props} /> : <Redirect to="/" />)} />;

 }
// function PrivateRoute({ component: Component, isLoggedIn, role, ...rest }){		
		
// 	const currentUser = withAuth.currentUserValue;

// 	<Route {...rest} render={props => {
// 			console.log("private", this.props)
// 	// not logged in so redirect to login page with the return url
// 	if(!isLoggedIn){
// 		return <Redirect to="/login" />
// 	}
// 	 // check if route is restricted by role
// 	if (role && role.indexOf(currentUser.role) === -1){
// 		return <Redirect to="/admin" />
// 	}
// 	// authorised so return component
// 	if(isLoggedIn){
// 		return <Component {...props} />
// 	}	

// }} />

// };

export default withAuth(PrivateRoute);
