import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class MainPage extends Component{
  render(){
    return(
      <h1>Hello, this is your main page</h1>
    )
  }
}

export default withAuth(MainPage);
