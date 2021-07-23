import React, { Component } from 'react';

import "./SearchBar.css"

class SearchBar extends Component{

  constructor(props) {
    super(props)
    this.state = {
      query: "",  
    }    
  }
 

  handleChange = (x) => {
    this.setState({ query: x.target.value });  
    this.props.search(x.target.value)
    console.log("searchquery", this.state.query)
  }

  render(){
    
    return(
      <div className="searchbar_container">
            <input className="searchbar" type="text" label="text" name="value" placeholder="Search by location" value={this.state.query} onChange={this.handleChange}/>
       </div>
    )
  }
}

export default SearchBar;