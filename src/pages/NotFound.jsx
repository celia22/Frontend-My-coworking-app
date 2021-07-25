import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Errors.css';

const NotFound = () => {
	return (
		<div>
			<Link to="/">
				<button className="back_button"> &laquo; Back</button>
			</Link>
			<h1>Oops!</h1>
			<h2>Page not found</h2>
			<img className="img_404" src="/images/errors/404.png" alt="page not found" />
		</div>
	);
};

export default NotFound;
