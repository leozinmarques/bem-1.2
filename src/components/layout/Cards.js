import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';

class Cards extends Component {
	render(){
		return(
			<Row className="show-grid">
				<Col md={4}>
					<h1>TESTANDO</h1>
				</Col>
				<Col md={4}>
					<h1>TESTANDO</h1>
				</Col>
				<Col md={4}>
					<h1>TESTANDO</h1>
				</Col>
			</Row>
		);
	}
}

export default Cards;
