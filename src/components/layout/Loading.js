import React, {Component} from 'react';
import { ClipLoader } from 'react-spinners';
import {Grid, Col, Row} from 'react-bootstrap';

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
						<ClipLoader sizeUnit={"px"} size={150} color={'#123abc'} loading={this.props.loading}/>
					</Col>
					<Col sm={1} xs={1} md={1}/>
				</Row>
			</Grid>
		);
	}
}
