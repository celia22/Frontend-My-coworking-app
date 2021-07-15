import React, { Component } from 'react';

import MainPageCarousel from "../components/MainPage/MainPageCarousel";

class MainPage extends Component{
  render(){
    return(
      <>
      <h1>Hello, this is your main page</h1>

      <div>
        <h2>Our buildings</h2>
        <MainPageCarousel />

        <article>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at diam at purus porta ultrices eget
           vitae massa. Aenean volutpat luctus ligula, quis varius ex aliquet fermentum. Curabitur porta 
           imperdiet sapien, sagittis ornare elit finibus non. Sed neque metus, euismod in mauris sit amet, 
           convallis sagittis ex. Aliquam porttitor erat mauris, vitae facilisis sapien mattis in. 


        </article>
      </div>
      </>
    )
  }
}

export default MainPage;
