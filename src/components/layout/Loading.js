import React from 'react';
import { ClipLoader } from 'react-spinners';
import {Grid, Col, Row} from 'react-bootstrap';
import '../../styles/css/Loading.css';

export default class Loading extends React.Component{
	constructor(props){
		super();
	}

	render(){
		return(
			<Grid>
			<Row>
			<Col sm={1} xs={1} md={1} />
			<Col sm={10} xs={10} md={10}>
			<ClipLoader sizeUnit={"px"} size={120} color={'#94D1EA'} loading={this.props.loading}/>
			</Col>
			<Col sm={1} xs={1} md={1}/>
			</Row>
			</Grid>
			);
	}
}
