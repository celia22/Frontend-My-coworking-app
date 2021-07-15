import React, { Component } from 'react';
import SpacesCards from '../components/UserMainPage/SpacesCards';
import { withAuth } from '../providers/AuthProvider';
import spaceClient from '../lib/spaceClient';



class UserMainPage extends Component{

  constructor(props){
    super(props)
    this.state = {
      allSpaces: []
    }
  }   


async componentDidMount()  {
  console.log("me llaman")
		try {
		const allSpaces = await spaceClient.getAllSpaces();
    console.log("allspaces in CDM", allSpaces)
    this.setState({
      allSpaces,
    })
     
		} catch (e) {
			console.log(e)
	}
}

  render(){
    
    const { allSpaces } = this.state
    
    return(
      <>
      <h1>Hello, this is your user main page</h1>

      <div>
        <SpacesCards allSpaces={allSpaces}/>   
      </div>
      </>
    )
  }
}

export default withAuth(UserMainPage)
