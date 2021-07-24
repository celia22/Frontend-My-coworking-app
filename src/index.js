import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AuthProvider from './providers/AuthProvider';
import './index.css';
import CartProvider from './providers/CartProvider';

ReactDOM.render(
	<Router>
		<AuthProvider>
			<CartProvider>
				<App />
			</CartProvider>
		</AuthProvider>
	</Router>,
	document.getElementById('root')
);
