import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';
import apiService from '../../lib/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SpaceForm.css';

const validateForm = errors => {
	let valid = true;
	Object.values(errors).forEach(item => item.length > 0 && (valid = false));
	return valid;
};

class EditSpaceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spaceName: '',
			spaceType: '',
			imgUrl: '',
			daily: 0,
			weekly: 0,
			monthly: 0,
			city: '',
		};
	}

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	// handleFileUpload = event => {
	// 	console.log('The file to be uploaded is: ', event.target.files[0]);
	// 	const uploadData = new FormData();
	// 	uploadData.append('imgUrl', event.target.files[0]);
	// 	apiService
	// 		.handleUpload(uploadData)
	// 		.then(response => {
	// 			console.log('response is: ', response);
	// 			this.setState({ imgUrl: response.secure_url });
	// 		})
	// 		.catch(err => {
	// 			console.log('Error while uploading the file: ', err);
	// 		});
	// };

	editSpaceHandler = async event => {
		event.preventDefault();
		const { spaceName, spaceType, imgUrl, daily, weekly, monthly, city } = this.state;
		try {
			await apiService.newSpace({ spaceName, spaceType, imgUrl, daily, weekly, monthly, city });
			toast.success('Space sucessfully edited');
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/admin' });
		}
	};

	render() {
		const { spaceName, spaceType, imgUrl, daily, weekly, monthly, city } = this.state;
		console.log(this.props);

		return (
			<div className="new_edit_form_container">
				<Link to="/admin" className="back_button">
					{' '}
					&laquo; Back
				</Link>

				<form onSubmit={this.createSpaceHandler} className="new_edit_form">
					<label>
						<strong>Name: {spaceName}</strong>
					</label>
					<input
						type="text"
						name="spaceName"
						value={spaceName}
						onChange={this.handleChange}
						className="new_edit_form_space"
					/>

					<label>
						<strong>Type:</strong>
					</label>
					<input
						type="text"
						name="spaceType"
						value={spaceType}
						onChange={this.handleChange}
						className="new_edit_form_space"
					/>

					<label>
						<strong>Image:</strong>
					</label>
					<input type="file" value={imgUrl} onChange={this.handleFileUpload} className="new_edit_form_space" />
					<div>
						<table>
							<tbody>
								<tr>
									<th className="edit_form_space_price">
										<label>
											<strong>Price:</strong>
										</label>
									</th>
								</tr>
								<tr>
									<th>
										Daily:
										<input
											className="new_edit_form_space_price"
											type="number"
											name="daily"
											value={daily}
											onChange={this.handleChange}
										/>
									</th>
									<th>
										Weekly:
										<input
											className="new_edit_form_space_price"
											type="number"
											name="weekly"
											value={weekly}
											onChange={this.handleChange}
										/>
									</th>
									<th>
										Monthly:
										<input
											className="new_edit_form_space_price"
											type="number"
											name="monthly"
											value={monthly}
											onChange={this.handleChange}
										/>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<label>
						<strong>City:</strong>
					</label>
					<input type="text" name="city" value={city} onChange={this.handleChange} className="new_edit_form_space" />

					<input type="submit" value="Edit space" className="new_edit_send" />
				</form>
			</div>
		);
	}
}
export default withAuth(EditSpaceForm);
