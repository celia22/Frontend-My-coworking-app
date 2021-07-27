import { React } from 'react';
import { Link } from 'react-router-dom';
import './SpaceCards.css';

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
								<div className="space_card_title">
									<h4>
										{item.spaceName} {item.spaceType}
									</h4>
									<h4>{item.city}</h4>
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
