import axios from 'axios';

class apiService {
	constructor() {
		this.apiService = axios.create({
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
		return this.apiService
			.post('/space/new', { spaceName, spaceType, imageUrlSpace, daily, weekly, monthly })
			.then(({ data }) => data);
	}

	handleUpload(theFile) {
		console.log('file in service: ', theFile);
		return this.apiService.post('/space/new', theFile).then(response => response.data);
	}

	getAllSpaces() {
		return this.apiService.get('/space/all').then(response => response.data);
	}

	getSingleSpace(id) {
		return this.apiService.get(`/space/${id}/details`).then(({ data }) => data);
	}

	// updateSpace(user, id) {
	// 	const { email, password, firstName, lastName, city } = user;
	// 	return this.apiService
	// 		.put(`/user/${id}/update-profile`, { email, password, firstName, lastName, city })
	// 		.then(({ data }) => data);
	// }
}

// const apiService = new apiService();

// export default apiService;
