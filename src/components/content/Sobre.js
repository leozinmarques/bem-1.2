import React from 'react';
import {Col, Row, Grid, Image} from 'react-bootstrap';
import bem from '../../styles/images/bem-banner.png';
import '../../styles/css/Sobre.css';

export default class Sobre extends React.Component{

	render(){
		return(
			<Grid>
			<Row>
			<Col sm={1} xs={1} md={1} />
			<Col sm={10} xs={10} md={10} >
			<Image className="image" src={bem} responsive/>
			</Col>
			<Col sm={1} xs={1} md={1} />
			</Row>
			</Grid>
			);
	}
}