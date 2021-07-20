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
						<div key={item._id} className="space_card_item ">
							<Link to={`/space/${item._id}/details`}>
								<div className="space_card_item_title">
									<h4>{item.spaceName}</h4>
									<h4>Type: {item.spaceType}</h4>
								</div>
								<img src="{item.imageUrlSpace}"></img>
								<div className="space_card_item_price">
									<h4>Price:</h4>
									<h5>Daily: {item.daily}</h5>
									<h5>Weekly: {item.weekly}</h5>
									<h5>Monthly: {item.monthly}</h5>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default SpacesCards;
