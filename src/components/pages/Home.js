import React, { Component } from 'react';
import Cards from '../layout/Cards.js';
import '../../styles/css/Home.css';
import JumbotronBem from '../layout/JumbotronBem.js';
import {Grid, Col, Row} from 'react-bootstrap';


class Home extends Component {
  render() {
    return (
    	<Grid>
	      	<Row>
	      		<Col sm={1} xs={1} md={1} />
	      		<Col sm={10} xs={10} md={10} >
	      			<JumbotronBem />
	      			<Cards />
	      		</Col>
	      		<Col sm={1} xs={1} md={1} />
	      	</Row>
      	</Grid>
    );
  }
}

export default Home;
