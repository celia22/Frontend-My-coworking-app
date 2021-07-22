import React, { Component } from 'react';
import SpacesCards from '../components/Space/SpacesCards';
import SearchBar from '../components/Space/SearchBar';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import apiService from '../lib/apiService';

class UserMainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allSpaces: [],
			searchSpaces: []
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

	  searchProductQuery = (value) => {
    
    const { allSpaces } = this.state;
    const searchSpace = [...allSpaces].filter((item) =>
      item.city.toLowerCase().includes(value)
    );

    return this.setState({
      searchSpaces: searchSpace,
    });
  };


	render() {
		const {  searchSpaces } = this.state;
		const { user } = this.props;
		console.log('usermainpage', user.role);
		console.log("spaces", this.state.allSpaces)
		return (
			<>
					  
				{user.role === 'admin' ? (
					<div>
						<button>
							<Link to={"/admin"}> Admin Options </Link>
						</button>
					</div>
				) : (
					" "
				)}

				< SearchBar search={this.searchProductQuery}/>

				<div>
					<SpacesCards allSpaces={searchSpaces} />
				</div>
			</>
		);
	}
}

export default withAuth(UserMainPage);
