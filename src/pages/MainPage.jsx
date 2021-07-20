import React, { Component } from 'react';
import "./styles/MainPage.css"

import MainPageCarousel from "../components/MainPageCarousel/MainPageCarousel";

class MainPage extends Component{
  render(){
    return(
      <div className="main_page_container">  
        
        <h2>Discover our buildings</h2>
          <MainPageCarousel />
      
        <p>
          Welcome to My-Coworking, the place to find awesome work spaces and amazing perks.
          Join us!
        </p>    
      </div>
    )
  }
}

export default MainPage;
