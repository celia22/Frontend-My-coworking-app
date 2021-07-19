import axios from 'axios';

class ApiClient {
	constructor() {
		this.apiClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}

	me() {
		return this.apiClient.get('/whoami').then(response => response.data);
	}

	signup(user) {
		const { email, password, firstName, lastName, city } = user;
		return this.apiClient.post('/signup', { email, password, firstName, lastName, city }).then(({ data }) => data);
	}

	login(user) {
		const { email, password } = user;
		return this.apiClient.post('/login', { email, password }).then(({ data }) => data);
	}

	logout() {
		return this.apiClient.post('/logout', {}).then(response => response.data);
	}

	updateProfile(user, id) {
		const { email, password, firstName, lastName, city } = user;
		return this.apiClient
			.put(`/user/${id}/update-profile`, { email, password, firstName, lastName, city })
			.then(({ data }) => data);
	}
}

const apiClient = new ApiClient();

export default apiClient;
