import React, { Component } from 'react';
import {Carousel, Grid} from 'react-bootstrap';
import test from '../../styles/images/test.jpg';
import img1 from '../../styles/images/img1.png';


class UncontrolledCarousel extends Component {
	render(){
		return(
			<Carousel>
			  <Carousel.Item>
			    <img alt="900x500" src={img1} />
			    <Carousel.Caption>
			      <h3>TESTE BEM</h3>
			      <p>TESTE BEM</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			    <img alt="900x500" src={test} />
			    <Carousel.Caption>
			      <h3>TESTE BEM</h3>
			      <p>TESTE BEM</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			  <Carousel.Item>
			    <img alt="900x500" src={img1} />
			    <Carousel.Caption>
			      <h3>TESTE BEM</h3>
			      <p>TESTE BEM</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			</Carousel>
		);
	}
}

export default UncontrolledCarousel;
