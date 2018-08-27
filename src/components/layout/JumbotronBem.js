import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

export default class JumbotronBem extends React.Component{

	render(){
		return(
			<Jumbotron>
			  <h1>BEM</h1>
			  <p>
			    Fazendo um teste simples
			  </p>
			  <p>
			    <Button bsStyle="primary">Veja Mais</Button>
			  </p>
			</Jumbotron>
		);
	}
}