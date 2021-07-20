// import axios from 'axios';

// class apiService {
// 	constructor() {
// 		this.apiService = axios.create({
// 			baseURL: process.env.REACT_APP_API_URI,
// 			withCredentials: true,
// 		});
// 	}

// 	newProduct(product) {
// 		const { spaceName, price, amount, description } = product;
// 		return this.apiService.post('/product/new', { spaceName, price, amount, description }).then(({ data }) => data);
// 	}

// 	getAllproducts(id) {
// 		return this.apiService.get(`/product/${id}/all`).then(response => response.data);
// 	}

// 	getSingleproduct(id) {
// 		return this.apiService.get(`/product/${id}/details`).then(({ data }) => data);
// 	}

// updateProduct(user, id) {
// 	const { email, password, firstName, lastName, city } = user;
// 	return this.apiService
// 		.put(`/user/${id}/update-profile`, { email, password, firstName, lastName, city })
// 		.then(({ data }) => data);
// }
// }

// const apiService = new apiService();

// export default apiService;
