import axios from 'axios';

class ProductClient {
	constructor() {
		this.productClient = axios.create({
			baseURL: process.env.REACT_APP_API_URI,
			withCredentials: true,
		});
	}

	newProduct(product) {
		const { spaceName, price, amount, description } = product;
		return this.productClient.post('/product/new', { spaceName, price, amount, description }).then(({ data }) => data);
	}

	getAllproducts(id) {
		return this.productClient.get(`/product/${id}/all`).then(response => response.data);
	}

	getSingleproduct(id) {
		return this.productClient.get(`/product/${id}/details`).then(({ data }) => data);
	}

	// updateProduct(user, id) {
	// 	const { email, password, firstName, lastName, city } = user;
	// 	return this.apiClient
	// 		.put(`/user/${id}/update-profile`, { email, password, firstName, lastName, city })
	// 		.then(({ data }) => data);
	// }
}

const productClient = new ProductClient();

export default productClient;
