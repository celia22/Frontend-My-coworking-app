import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../lib/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NewSpaceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spaceName: '',
			spaceType: '',
			imgUrl: ' ',
			daily: '',
			weekly: '',
			monthly: '',
			city: ' ',
		};
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleFileUpload = event => {
		console.log('The file to be uploaded is: ', event.target.files[0]);
		const uploadData = new FormData();
		uploadData.append('imgUrl', event.target.files[0]);
		apiService
			.handleUpload(uploadData)
			.then(response => {
				console.log('response is: ', response);
				this.setState({ imgUrl: response.secure_url });
			})
			.catch(err => {
				console.log('Error while uploading the file: ', err);
			});
	};

	createSpaceHandler = async event => {
		event.preventDefault();
		const { spaceName, spaceType, imgUrl, daily, weekly, monthly, city } = this.state;
		try {
			await apiService.newSpace({
				spaceName,
				spaceType,
				imgUrl,
				daily,
				weekly,
				monthly,
				city,
			});
			toast.success('New space created');
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({ pathname: '/admin' });
		}
	};

	render() {
		const { spaceName, spaceType, daily, weekly, monthly, city } = this.state;
		return (
			<div className="new_edit_form_container">
				<Link to="/admin" className="back_button">
					{' '}
					&laquo; Back{' '}
				</Link>

				<form onSubmit={this.createSpaceHandler} className="new_edit_form">
					<label>
						<strong>Name:</strong>
					</label>
					<input type="text" name="spaceName" value={spaceName} onChange={this.handleChange} />

					<label>
						<strong>Type:</strong>
					</label>
					<input type="text" name="spaceType" value={spaceType} onChange={this.handleChange} />

					<label>
						<strong>Image:</strong>
					</label>
					<input type="file" onChange={event => this.handleFileUpload(event)} />
					<div>
						<table>
							<tbody>
								<tr>
									<th>
										<label className="new_edit_table_title">
											<strong>Price:</strong>
										</label>
									</th>
								</tr>
								<tr>
									<th>
										Daily:
										<input
											className="new_edit_table_input"
											type="number"
											name="daily"
											value={daily}
											onChange={this.handleChange}
										/>
									</th>
									<th>
										Weekly:
										<input
											className="new_edit_table_input"
											type="number"
											name="weekly"
											value={weekly}
											onChange={this.handleChange}
										/>
									</th>
									<th>
										Monthly:
										<input
											className="new_edit_table_input"
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
					<input type="text" name="city" value={city} onChange={this.handleChange} />

					<input type="submit" value="Add new space" className="new_edit_send" />
				</form>
			</div>
		);
	}
}

export default NewSpaceForm;
