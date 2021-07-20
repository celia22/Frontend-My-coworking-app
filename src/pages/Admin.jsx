import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class MainPage extends Component{
  render(){
    return(
      <>      
      <h1>Welcome to your admin page</h1>
      <button> <Link to="/user/:id/update-profile"> Edit account </Link> </button>
      <button> <Link to="/space/new"> Add a new space </Link> </button>
       <button> <Link to="/space/edit"> Edit space </Link> </button>
      </>
    )
  }
}

export default withAuth(MainPage);
