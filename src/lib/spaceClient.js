import axios from 'axios';

class SpaceClient {
	constructor() {
		this.apiClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}

	newSpace(space) {
		const { spaceName, spaceType, imageUrlSpace, services, availableSpots, price } = space;
		return this.apiClient
			.post('/space/new', { spaceName, spaceType, imageUrlSpace, services, availableSpots, price })
			.then(({ data }) => data);
	}
}

const spaceClient = new SpaceClient();

export default spaceClient;
