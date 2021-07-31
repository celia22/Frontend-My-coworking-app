import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const search = <FontAwesomeIcon icon={faSearch} color="black" />;

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
		};
	}

	handleChange = x => {
		this.setState({ query: x.target.value });
		this.props.search(x.target.value);
		console.log('searchquery', this.state.query);
	};

	render() {
		return (
			<div className="searchbar_container">
				<div className="searchbar">
					<p className="searchbar_icon">{search}</p>
					<input
						type="text"
						label="text"
						name="value"
						placeholder="Search by location"
						value={this.state.query}
						onChange={this.handleChange}
					/>
				</div>
			</div>
		);
	}
}

export default SearchBar;
