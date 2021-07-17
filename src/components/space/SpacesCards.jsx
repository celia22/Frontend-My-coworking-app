import React from 'react';
import { Link } from 'react-router-dom';
import './SpaceCard.css';

const SpacesCards = props => {
	const allSpaces = props.allSpaces;



	return (
		<>
			<h2>Our spaces</h2>
			<div className="space_card_scroll">
				<Link to="/space/:id/details">
				{allSpaces.map(item => {
					return (
						<div key={item._id} className="space_card_item ">
							<h4>Name: {item.spaceName}</h4>
							<h4>Type: {item.spaceType}</h4>
							<h4>Image: {item.imageUrlSpace}</h4>
							{/* {item.services.map(item => {
								return (
									<>
										<h4>Services:</h4>
										<p key={item._id}>{item.product}</p>
									</>
								);
							})} */}
							<h4>Price:</h4>
							<h5>Daily: {item.daily}</h5>
							<h5>Weekly: {item.weekly}</h5>
							<h5>Monthly: {item.monthly}</h5>
						</div>
					);
				})}
				</Link>
			</div>
		</>
	);
};

export default SpacesCards;
