import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import NewSpaceForm from '../components/space/NewSpaceForm';
import { withAuth } from '../providers/AuthProvider';

class MainPage extends Component{
  render(){
    return(
      <>      
      <h1>Welcome to your admin page</h1>
      <Link to="/space/new"> Create a new space </Link>
      </>
    )
  }
}

export default withAuth(MainPage);
