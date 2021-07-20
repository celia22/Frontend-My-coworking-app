import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';
import apiService from "../../lib/apiService";

class EditUserSpace extends Component {
  constructor(props) {
		super(props);
		this.state = {
			spaceName: '',
			spaceType: '',
			imageUrlSpace: '',
			daily: 0,
			weekly: 0,
			monthly: 0,
			city: ' ',
			// price: {
			// 	daily: 0,
			// 	weekly: 0,
			// 	monthly: 0,
			// },
			
		};
	}

		handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleFileUpload = e => {
    console.log('The file to be uploaded is: ', e.target.files[0]); 
    const uploadData = new FormData();
    uploadData.append('imageUrlSpace', e.target.files[0]);
 
   apiService
      .handleUpload(e)
      .then(response => {
        console.log('response is: ', response);
        this.setState({ imageUrlSpace: response.secure_url });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });
  };

	createSpaceHandler = async (event) => {
		event.preventDefault();
		const { spaceName, spaceType,imageUrlSpace, daily, weekly, monthly, city } = this.state;
		try {
			const newSpace = await apiService.newSpace({spaceName, spaceType,imageUrlSpace, daily, weekly, monthly, city });
			await console.log(newSpace);
			await this.setState({
				spaceName: '',
				spaceType: '',
				imageUrlSpace: '',
				daily: 0,
				weekly: 0,
				monthly: 0,
				city: ' ',
			});
		} catch (e) {
			console.log(e);
		} finally {
			this.props.history.push({pathname: "/admin"})
		}
	};

	render() {
		const {
			spaceName,
			spaceType,
			imageUrlSpace,
			daily,
			weekly,
			monthly,
			city,
		} = this.state;

		return (
			<div className="new_edit_form_container">
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
					<input type="file" onChange={this.handleFileUpload} />
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

					<input type="submit" value="Edit space" className="new_edit_send" />
				</form>
			</div>
		);
	}
}

export default withAuth(EditUserSpace);
