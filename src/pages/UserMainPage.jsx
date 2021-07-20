import React, { Component } from 'react';
import SpacesCards from '../components/Space/SpacesCards';
import { withAuth } from '../providers/AuthProvider';
import spaceClient from '../lib/spaceClient';

class UserMainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allSpaces: [],
		};
	}

	async componentDidMount() {
		try {
			const allSpaces = await spaceClient.getAllSpaces();
			this.setState({
				allSpaces,
			});
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		const { allSpaces } = this.state;
		  console.log('usermainpage', this.props);
		return (
	
				<div>
					<SpacesCards allSpaces={allSpaces} />
				</div>

		);
	}
}

export default withAuth(UserMainPage);
