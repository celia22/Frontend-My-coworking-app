import axios from 'axios';

class SpaceClient {
	constructor() {
		this.spaceClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}

	newSpace(space) {
		const { spaceName, spaceType, imageUrlSpace, services, availableSpots, price } = space;
		return this.spaceClient
			.post('/space/new', { spaceName, spaceType, imageUrlSpace, services, availableSpots, price })
			.then(({ data }) => data);
	}

	getAllSpaces() {
		return this.spaceClient.get('/space/all').then(response => response.data);
	}
}

const spaceClient = new SpaceClient();

export default spaceClient;
