import React, { Component } from 'react';
import spaceClient from '../lib/spaceClient';
import { Link } from 'react-router-dom';
// import SpacesCards from '../components/Space/SpacesCards';
// import { withAuth } from '../providers/AuthProvider';

class SpaceDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			space: '',
		};
	}

	async componentDidMount() {
		const id = this.props.match.params.id;
		try {
			const singleSpace = await spaceClient.getSingleSpace(id);
			this.setState({
				space: singleSpace,
			});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { space } = this.state;

		return (
			<div>
       <Link to={"/user/main"}> Back </Link>
				<h1>Space details</h1>

				<h4>Name: {space.spaceName}</h4>
				<h4>Type: {space.spaceType}</h4>
				<h4>Image: {space.imageUrlSpace}</h4>
				<h4>Price:</h4>
				{/* <h5>Daily: {space.price.daily}</h5>
				<h5>Weekly: {space.price.weekly}</h5>
				<h5>Monthly: {space.price.monthly}</h5> */}
			</div>
		);
	}
}

export default SpaceDetails;
