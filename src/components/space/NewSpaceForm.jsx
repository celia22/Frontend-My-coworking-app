import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../lib/apiService';

class NewSpaceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spaceName: '',
			spaceType: '',
			imgUrl: [ ],
			price: { 
				daily: 0,
				weekly: 0,
				monthly: 0
			},
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
		this.setState({
			imgUrl: event.target.files[0]
		})

  console.log('The file to be uploaded is: ', event.target.files[0]); 
  //   const uploadData = new FormData();
  //   uploadData.append('imgUrl', e.target.files[0]);
 
  //  apiService
  //     .handleUpload(e)
  //     .then(response => {
  //      console.log('response is: ', response);
  //       this.setState({ imgUrl: response.secure_url });
  //     })
  //     .catch(err => {
  //       console.log('Error while uploading the file: ', err);
  //     });
  };


	createSpaceHandler = async (event) => {
		event.preventDefault();
		const { spaceName, spaceType,imgUrl, price:{daily, weekly, monthly}, city } = this.state;
		try {	
			const newSpace = await apiService.newSpace({spaceName, spaceType,imgUrl, price:{daily, weekly, monthly}, city });
			console.log("newspace", newSpace);
			const uploadData = new FormData();
    	uploadData.append('imgUrl', event.target.files[0]);
			const uploadImg = await apiService.handleUpload(event)
			this.setState({
				imgUrl: uploadImg.secure_url
			})
			console.log(uploadImg)
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
			price,
			city,
		} = this.state;

		return (
			<div className="new_edit_form_container">

				<Link to="/admin"> Back </Link>

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
					<input type="file"  onChange={event => this.handleFileUpload(event)} /> 
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
											name="price.daily"
											value={price.daily}
											onChange={this.handleChange}
										/>
									</th>
									<th>
										Weekly:
										<input
											className="new_edit_table_input"
											type="number"
											name="price.weekly"
											value={price.weekly}
											onChange={this.handleChange}
										/>
									</th>
									<th>
										Monthly:
										<input
											className="new_edit_table_input"
											type="number"
											name="price.monthly"
											value={price.monthly}
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
