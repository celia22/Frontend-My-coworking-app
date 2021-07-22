 import React, { Component } from 'react';
 import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 


class WelcomePageCarousel extends Component {
  render() {
        return (
        <div className="carousel_container">   
          <Carousel autoPlay={true}
          showArrows={true}
          stopOnHover={false}
          showThumbs={true}
          showStatus={true}
          infiniteLoop={true}
          showIndicators={true}>
           
                <div>
                    <img src="/images/WelcomePage/main1.png" />
                    <p className="legend">Barcelona</p>
                </div>
                <div>
                    <img src="/images/WelcomePage/main2.png" />
                    <p className="legend">Lisbon</p>
                </div>
                <div>
                    <img src="/images/WelcomePage/main3.png" />
                    <p className="legend">Lyon</p>
                </div>
                <div>
                    <img src="/images/WelcomePage/main4.png" />
                    <p className="legend">Bilbao</p>
                </div>

            </Carousel>
        </div>     
        );
    }
}

export default WelcomePageCarousel; 

// import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
// import "./WelcomePageCarousel.css"

// const right = <FontAwesomeIcon  icon={faChevronRight} color="black" size="2x"/>

// const left = <FontAwesomeIcon  icon={faChevronLeft} color="black" size="2x"/>
// class WelcomePageCarousel extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       imgs:[
//             <img key={0} src="/images/WelcomePage/main1.png" alt="coworking open space" />,
//             <img key={1} src="/images/WelcomePage/main2.png" alt="coworking open space" />,
//             <img key={2} src="/images/WelcomePage/main3.png" alt="coworking open space" />,
//             <img key={3} src="/images/WelcomePage/main4.png" alt="coworking open space" />,
//           ],
//       index: 1,
//     }
//   }

//   handlerLeft = () => {
//     const { index } = this.state;
//     (index > 1 ) && this.setState({index: index - 1})
//   }


//   handlerRigth = () => {
//     const { imgs, index } = this.state;
//     (index < imgs.length ) && this.setState({index: index + 1}) 
//   }

//   render(){
//     const { index } = this.state;

//     return(
//       <div className="carousel_container">
//         <button onClick={this.handlerLeft}>{left}</button>
//         <img src={`/images/WelcomePage/main${index}.png`} alt="pictures" />
//         <button onClick={this.handlerRigth}>{right}</button>
//       </div>
//     )
//   }
// }

// export default WelcomePageCarousel; 