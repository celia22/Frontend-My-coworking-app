import { Component, React } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import apiService from '../lib/apiService';
import './styles/AllSpacesToEdit.css';

class AllSpacesToEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allSpaces: [],
		};
	}

	async componentDidMount() {
		try {
			const allSpaces = await apiService.getAllSpaces();
			this.setState({
				allSpaces,
			});
			console.log(this.state.allSpaces);
			console.log('didmount');
		} catch (e) {
			console.log(e);
		}
	}

	async deleteSpace(id) {
		try {
			apiService.deleteSpace(id);
			console.log('user deleted??', id);
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		const { allSpaces } = this.state;
		return (
			<>
				<div className="all_space_card_scroll">
					{allSpaces.map(item => {
						return (
							<div key={item._id} className="all_space_card_item ">
								<div className="all_space_card_item_title">
									<h4>{item.spaceName}</h4>
									<h4>Type: {item.spaceType}</h4>
								</div>
								<img className="all_space_card_item_image" src={item.imgUrl}></img>
								<div className="all_space_card_item_price">
									<h4>Price:</h4>
									<h5>Daily: {item.daily}</h5>
									<h5>Weekly: {item.weekly}</h5>
									<h5>Monthly: {item.monthly}</h5>
								</div>
								<button className="edit_button">
									{' '}
									<Link to={`/space/${item._id}/edit`} className="button_link">
										{' '}
										Edit space{' '}
									</Link>{' '}
								</button>
								<button className="delete_button" onClick={() => this.deleteSpace(item._id)}>
									Delete Space
								</button>
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

export default withAuth(AllSpacesToEdit);
