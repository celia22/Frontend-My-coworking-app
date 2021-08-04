import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class WelcomePageCarousel extends Component {
	render() {
		return (
			<div className="carousel_container">
				<Carousel
					autoPlay={true}
					showArrows={true}
					stopOnHover={false}
					showThumbs={true}
					showStatus={true}
					infiniteLoop={true}
					showIndicators={true}
				>
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
