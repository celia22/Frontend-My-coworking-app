import {React} from 'react';
import { Link } from 'react-router-dom';
import './SpaceCard.css';


const SpacesCards = props => {
	const searchSpaces = props.searchSpaces;
	console.log("allspaces space card", searchSpaces)

	return (
		<>
			<h2>Our spaces</h2>
			<div className="space_card_scroll">
				{searchSpaces.map(item => {
					return (
						<div key={item._id} className="space_card_item ">
							<Link to={`/space/${item._id}/details`}>
								<div className="space_card_item_title">
									<h4>{item.spaceName}</h4>
									<h4>Type: {item.spaceType}</h4>
								</div>
								<img className="space_card_item_image" src={item.imageUrlSpace}></img>
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




// class SpacesCards extends Component {
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			allSpaces: this.props.allSpaces,
// 			searchSpaces: this.props.searchSpaces
// 		}
// 	}


// 	componentDidUpdate(prevProps) {
// 		if (this.state.products !== prevProps.products) {
// 			this.setState({
// 				products: this.props.products,
// 			});
// 		}
// 	}


// render(){
// 	// const { searchSpaces } = this.props.searchSpaces;
// 	return (
// 		<>
// 			<h2>Our spaces</h2>
// 			<div className="space_card_scroll">
// 				{this.props.searchSpaces.map(item => {
// 					return (
// 						<div key={item._id} className="space_card_item ">
// 							<Link to={`/space/${item._id}/details`}>
// 								<div className="space_card_item_title">
// 									<h4>{item.spaceName}</h4>
// 									<h4>Type: {item.spaceType}</h4>
// 								</div>
// 								<img className="space_card_item_image" src={item.imageUrlSpace}></img>
// 								<div className="space_card_item_price">
// 									<h4>Price:</h4>
// 									<h5>Daily: {item.daily}</h5>
// 									<h5>Weekly: {item.weekly}</h5>
// 									<h5>Monthly: {item.monthly}</h5>
// 								</div>
// 							</Link>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</>
// 	);
// 	}
// };

// export default SpacesCards;
