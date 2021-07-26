import React, { Component } from 'react';
import SpacesCards from '../components/Space/SpacesCards';
import SearchBar from '../components/Space/SearchBar';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import apiService from '../lib/apiService';
import './styles/UserMainPage.css';

class UserMainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allSpaces: [],
			searchSpaces: [],
		};
	}

	async componentDidMount() {
		try {
			const allSpaces = await apiService.getAllSpaces();
			this.setState({
				allSpaces,
				searchSpaces: allSpaces,
			});
			console.log('didmount', this.state);
		} catch (e) {
			console.log(e);
		}
	}

	searchProductQuery = value => {
		const { allSpaces } = this.state;
		const searchSpace = [...allSpaces].filter(item => item.city.toLowerCase().includes(value));
		if (value.length === 0) {
			return this.setState({
				searchSpace: allSpaces,
			});
		} else {
			return this.setState({
				searchSpaces: searchSpace,
			});
		}
	};

	render() {
		const { searchSpaces } = this.state;
		const { user } = this.props;
		// console.log('usermainpage', user.role);
		// console.log('spaces', this.state.searchSpaces);
		return (
			<div className="user_main_page_container">
				{user.role === 'admin' ? (
					<div>
						<button className="admin_nav">
							<Link className="admin_nav_link" to={'/admin'}>
								Admin Options
							</Link>
						</button>
					</div>
				) : (
					' '
				)}
				<SearchBar search={this.searchProductQuery} />

				<SpacesCards searchSpaces={searchSpaces} />
			</div>
		);
	}
}

export default withAuth(UserMainPage);
