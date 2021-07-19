import React from 'react';
import { Link } from 'react-router-dom';
import './SpaceCard.css';

const SpacesCards = props => {
	const allSpaces = props.allSpaces;


	return (
		<>
			<h2>Our spaces</h2>
			<div className="space_card_scroll">
				{allSpaces.map(item => {
					return (
						<>
							<div key={item._id} className="space_card_item ">
								<Link to={`/space/${item._id}/details`}>
								{/* <Link > */}
									<h4>Name: {item.spaceName}</h4>
									<h4>Type: {item.spaceType}</h4>
									<h4>Image: {item.imageUrlSpace}</h4>
									<h4>Price:</h4>
									<h5>Daily: {item.price.daily}</h5>
									<h5>Weekly: {item.price.weekly}</h5>
									<h5>Monthly: {item.price.monthly}</h5>
								</Link>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
};

export default SpacesCards;
