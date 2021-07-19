import axios from 'axios';

class SpaceClient {
	constructor() {
		this.spaceClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}

	newSpace(space) {
		const {
			spaceName,
			spaceType,
			imageUrlSpace,
			price: [{ daily, weekly, monthly }],
		} = space;
		return this.spaceClient
			.post('/space/new', { spaceName, spaceType, imageUrlSpace, price: { daily, weekly, monthly } })
			.then(({ data }) => data);
	}

	getAllSpaces() {
		return this.spaceClient.get('/space/all').then(response => response.data);
	}

	getSingleSpace(id) {
		return this.spaceClient.get(`/space/${id}/details`).then(({ data }) => data);
	}
}

const spaceClient = new SpaceClient();

export default spaceClient;
