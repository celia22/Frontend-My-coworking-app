import React, { Component } from 'react';
import "./styles/WelcomePage.css"

import WelcomePageCarousel from "../components/WelcomePageCarousel/WelcomePageCarousel";

class WelcomePage extends Component{
  render(){
    return(
      <div className="main_page_container">  
        
        <h2>Discover our buildings</h2>
          <WelcomePageCarousel />
      
        <p>
          Welcome to My-Coworking, the place to find awesome work spaces and amazing perks.
          Join us!
        </p>    
      </div>
    )
  }
}

export default WelcomePage;
