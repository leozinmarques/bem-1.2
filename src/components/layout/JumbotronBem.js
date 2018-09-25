import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class JumbotronBem extends React.Component{

	render(){
		return(
			<Jumbotron>
			  <h1>BEM</h1>
			  <p>
			    O sistema BEM encaminha pessoas que suspeitam ter
			    Depressão, Estresse ou Ansiedade para profissionais
			    adequados baseando-se em um questionário interativo
			    feito a partir da escala DASS21.
			  </p>
			  <p>
			    <Link to ="/Sobre"><Button bsStyle="primary">Veja Mais</Button></Link>
			  </p>
			</Jumbotron>
		);
	}
}