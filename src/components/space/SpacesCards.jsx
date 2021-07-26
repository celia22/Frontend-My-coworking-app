import { React } from 'react';
import { Link } from 'react-router-dom';
import './SpaceCard.css';

const SpacesCards = props => {
	const searchSpaces = props.searchSpaces;
	console.log('allspaces space card', searchSpaces);

	return (
		<div className="space_card_container">
			<h2>Our awesome spaces</h2>
			<div className="space_card_scroll">
				{searchSpaces.map(item => {
					return (
						<div key={item._id} className="space_card_item ">
							<Link to={`/space/${item._id}/details`}>
								<div className="space_card_item_title">
									<h4>{item.spaceName}</h4>
									<h4>Type: {item.spaceType}</h4>
								</div>
								<img className="space_card_item_image" src={item.imgUrl}></img>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SpacesCards;
