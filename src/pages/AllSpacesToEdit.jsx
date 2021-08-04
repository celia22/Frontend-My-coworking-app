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
		} catch (e) {
			console.log(e);
		}
	}

	async deleteSpace(id) {
		try {
			await apiService.deleteSpace(id);
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
		return (
			<>
				{this.props.user.role === 'admin' ? (
					<div className="space_card_scroll">
						<Link to={'/admin'} className="back_button">
							&laquo; Back
						</Link>

						{allSpaces.map(item => {
							return (
								<div key={item._id} className="spaces_toedit_card_container">
									<div className="space_card_item ">
										<div className="space_card_title">
											<h4>{item.spaceName}</h4>
											<h4>Type: {item.spaceType}</h4>
										</div>
										<img className="space_card_item_image" src={item.imgUrl}></img>
										<div className="space_card_button_container">
											<button className="edit_prods_button">
												{' '}
												<Link to={`/space/${item._id}/edit`} className="edit_button_link">
													{' '}
													Edit space{' '}
												</Link>{' '}
											</button>
											<button className="edit_prods_delete_button" onClick={() => this.deleteSpace(item._id)}>
												Delete Space
											</button>
										</div>
									</div>
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
