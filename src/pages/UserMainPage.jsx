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
		console.log('props en user main page', this.props);
		const { allSpaces } = this.state;

		return (
			<>
				<h1>Hello, this is your user main page</h1>

				<div>
					<p>{`id: ${this.props.match.params.id}`}</p>
					<SpacesCards allSpaces={allSpaces} />
				</div>
			</>
		);
	}
}

export default withAuth(UserMainPage);
