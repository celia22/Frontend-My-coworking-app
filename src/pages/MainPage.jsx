import React, { Component } from 'react';
import "./styles/MainPage.css"

import MainPageCarousel from "../components/MainPageCarousel/MainPageCarousel";

class MainPage extends Component{
  render(){
    return(
      <div className="main_page_container">  
        
        <h2>Our buildings</h2>

        <MainPageCarousel />

        <article>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at diam at purus porta ultrices eget
          vitae massa. Aenean volutpat luctus ligula, quis varius ex aliquet fermentum. Curabitur porta 
          imperdiet sapien, sagittis ornare elit finibus non. 
        </article>    
      </div>
    )
  }
}

export default MainPage;
