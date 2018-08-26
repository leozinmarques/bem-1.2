import React, { Component } from 'react';
import Cards from '../layout/Cards.js';
import '../../styles/css/Home.css';
import UncontrolledCarousel from '../layout/Carousel.js';
import {Grid, Col, Row} from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
    	<Grid>
	      	<Row>
	      		<Col sm={0} xs={1} md={1} />
	      		<Col sm={12} xs={12} md={12} >
	      			<UncontrolledCarousel className="carousel" />
	      			<Cards />
	      		</Col>
	      		<Col sm={0} xs={1} md={1} />
	      	</Row>
      	</Grid>
    );
  }
}

export default Home;
