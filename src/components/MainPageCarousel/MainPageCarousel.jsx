import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import "./MainPageCarousel.css"

const right = <FontAwesomeIcon  icon={faChevronRight} color="black" size="2x"/>

const left = <FontAwesomeIcon  icon={faChevronLeft} color="black" size="2x"/>
class MainPageCarousel extends Component {
  constructor(props){
    super(props)
    this.state = {
      imgs:[
            <img key={0} src="/images/mainpage/main1.png" alt="coworking open space" />,
            <img key={1} src="/images/mainpage/main2.png" alt="coworking open space" />,
            <img key={2} src="/images/mainpage/main3.png" alt="coworking open space" />,
            <img key={3} src="/images/mainpage/main4.png" alt="coworking open space" />,
          ],
      index: 1,
    }
  }

  handlerLeft = () => {
    const { index } = this.state;
    (index > 1 ) && this.setState({index: index - 1})
  }


  handlerRigth = () => {
    const { imgs, index } = this.state;
    (index < imgs.length ) && this.setState({index: index + 1}) 
  }

  render(){
    const { index } = this.state;

    return(
      <div className="carousel_container">
        <button onClick={this.handlerLeft}>{left}</button>
        <img src={`/images/mainpage/main${index}.png`} alt="pictures" />
        <button onClick={this.handlerRigth}>{right}</button>
      </div>
    )
  }
}

export default MainPageCarousel; 