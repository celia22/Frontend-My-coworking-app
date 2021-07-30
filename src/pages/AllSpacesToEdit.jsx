import { Component, React } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
			await apiService.deleteSpace(id);
			console.log('user deleted??', id);
		} catch (e) {
			console.log(e);
		} finally {
			const allSpaces = [...this.state.allSpaces].filter(item => {
				return item._id !== id;
			});
			this.setState({
				allSpaces,
			});
		}
	}

	render() {
		const { allSpaces } = this.state;
		console.log(this.props);
		return (
			<>
				{this.props.user.role === 'admin' ? (
					<div className="space_card_scroll">
						<Link to={'/admin'}>&laquo; Back</Link>

						{allSpaces.map(item => {
							return (
								<div key={item._id} className="space_card_item ">
									<div className="space_card_title">
										<h4>{item.spaceName}</h4>
										<h4>Type: {item.spaceType}</h4>
									</div>
									<img className="space_card_item_image" src={item.imgUrl}></img>
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
				) : (
					<Redirect to="user/main" />
				)}
			</>
		);
	}
}
export default withAuth(AllSpacesToEdit);
