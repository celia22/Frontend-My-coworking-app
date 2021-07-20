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
			daily,
			weekly,
			monthly,
			// price: { daily, weekly, monthly },
		} = space;
		console.log(space);
		return this.spaceClient
			.post('/space/new', { spaceName, spaceType, imageUrlSpace, daily, weekly, monthly })
			.then(({ data }) => data);
	}

	handleUpload(theFile) {
		console.log('file in service: ', theFile);
		return this.spaceClient.post('/space/new', theFile).then(response => response.data);
	}

	getAllSpaces() {
		return this.spaceClient.get('/space/all').then(response => response.data);
	}

	getSingleSpace(id) {
		return this.spaceClient.get(`/space/${id}/details`).then(({ data }) => data);
	}

	// updateSpace(user, id) {
	// 	const { email, password, firstName, lastName, city } = user;
	// 	return this.apiClient
	// 		.put(`/user/${id}/update-profile`, { email, password, firstName, lastName, city })
	// 		.then(({ data }) => data);
	// }
}

const spaceClient = new SpaceClient();

export default spaceClient;
