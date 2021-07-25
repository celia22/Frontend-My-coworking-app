import axios from 'axios';

class ApiService {
	constructor() {
		this.apiService = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}

	// USER METHODS

	me() {
		return this.apiService.get('/whoami').then(response => response.data);
	}

	signup(user) {
		const { email, password, firstName, lastName, city } = user;
		return this.apiService.post('/signup', { email, password, firstName, lastName, city }).then(({ data }) => data);
	}

	login(user) {
		const { email, password } = user;
		return this.apiService.post('/login', { email, password }).then(({ data }) => data);
	}

	logout() {
		return this.apiService.post('/logout', {}).then(response => response.data);
	}

	updateProfile(user, id) {
		const { email, password, firstName, lastName, city } = user;
		return this.apiService
			.put(`/user/${id}/update-profile`, { email, password, firstName, lastName, city })
			.then(({ data }) => data);
	}

	deleteAccount(id) {
		return this.apiService.delete(`/user/${id}/delete`).then(({ data }) => data);
	}

	// SPACES METHODS

	newSpace(space) {
		const { spaceName, spaceType, imgUrl, daily, weekly, monthly, city } = space;
		console.log(space);
		return this.apiService
			.post('/space/new', { spaceName, spaceType, imgUrl, daily, weekly, monthly, city })
			.then(({ data }) => data);
	}

	updateSpace(space, id) {
		const { spaceName, spaceType, imgUrl, daily, weekly, monthly, city } = space;
		return this.apiService
			.put(`/space/${id}/edit`, { spaceName, spaceType, imgUrl, daily, weekly, monthly, city })
			.then(({ data }) => data);
	}

	handleUpload(img) {
		// console.log('file in service: ', img);
		return this.apiService.post('/space/new', img).then(({ data }) => data);
	}

	getAllSpaces() {
		return this.apiService.get('/space/all').then(response => response.data);
	}

	getSingleSpace(id) {
		return this.apiService.get(`/space/${id}/details`).then(({ data }) => data);
	}

	deleteSpace(id) {
		return this.apiService.delete(`/space/${id}/delete`).then(({ data }) => data);
	}

	// PRODUCTS METHODS
	newProduct(product) {
		const { productPrice, productDescription } = product;
		return this.apiService.post('/product/new', { productPrice, productDescription }).then(({ data }) => data);
	}

	getAllproducts() {
		return this.apiService.get(`/product/all`).then(response => response.data);
	}

	deleteProduct(id) {
		return this.apiService.delete(`/product/${id}/delete`).then(({ data }) => data);
	}

	getSingleproduct(id) {
		return this.apiService.get(`/product/${id}/edit`).then(({ data }) => data);
	}

	editProduct(product, id) {
		const { productPrice, productDescription } = product;
		return this.apiService.put(`/product/${id}/edit`, { productPrice, productDescription }).then(({ data }) => data);
	}
}

const apiService = new ApiService();

export default apiService;
