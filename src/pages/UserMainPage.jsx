import React, { Component } from 'react';
import SpacesCards from '../components/space/SpacesCards';
import SearchBar from '../components/SearchBar/SearchBar';
import { withAuth } from '../providers/AuthProvider';
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

	handleFavs = favouritesArr => {
		this.setState({
			favouritesArr: favouritesArr,
		});
	};

	render() {
		const { searchSpaces } = this.state;

		return (
			<div className="user_main_page_container">
				<SearchBar search={this.searchProductQuery} />

				<SpacesCards searchSpaces={searchSpaces} />
			</div>
		);
	}
}

export default withAuth(UserMainPage);
