import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import MainPageCarousel from "../components/MainPage/MainPageCarousel";
// import main1 from "../images/mainpage/main1.png";
// import main2 from "../images/mainpage/main2.png";
// import main3 from "../images/mainpage/main3.png";
// import main4 from "../images/mainpage/main4.png";

class MainPage extends Component{
  render(){
    return(
      <>
      <h1>Hello, this is your main page</h1>

      <div>
        <h2>Our buildings</h2>
        <MainPageCarousel />
      </div>
      </>
    )
  }
}

export default withAuth(MainPage);
