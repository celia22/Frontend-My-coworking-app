import React, { Component } from 'react';
import SpacesCards from '../components/Space/SpacesCards';
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
					''
				)}

				<div>
					<SpacesCards allSpaces={allSpaces} />
				</div>
			</>
		);
	}
}

export default withAuth(UserMainPage);
