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
		};
	}

	async componentDidMount(value) {
		try {
			const allSpaces = await apiService.getAllSpaces();
			// const searchSpace = [...allSpaces].filter((item) =>
      // item.city.toLowerCase().includes(value)
    // );
			this.setState({
				// allSpaces: searchSpace
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
      allSpaces: searchSpace,
    });
  };


	render() {
		const { allSpaces } = this.state;
		const { user } = this.props;
		console.log('usermainpage', user.role);
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
					<SpacesCards allSpaces={allSpaces} />
				</div>
			</>
		);
	}
}

export default withAuth(UserMainPage);
