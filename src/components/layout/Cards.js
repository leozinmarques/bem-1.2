import React, {Component} from 'react';
import {Col, Row, Thumbnail, Button} from 'react-bootstrap';
import ansiedade from '../../styles/images/ansiedade.jpg';
import depressao from '../../styles/images/depressao.jpg';
import estresse from '../../styles/images/estresse.jpg';
import {Link} from 'react-router-dom';

export default class Cards extends Component {
	render(){
		return(
			<Row className="show-grid">
				<Col xs={12} md={4} sm={6}>
			      <Thumbnail src={depressao} alt="242x200">
			        <h3>Depressão</h3>
			        <p>Depressão é um estado depressivo de humor, caracterizado por aversão à atividade,
			         que pode afetar os pensamentos, comportamentos, sentimentos e o bem-estar de uma pessoa.
			         As pessoas deprimidas podem sentir-se tristes, ansiosas, vazias, desesperadas, preocupadas,
			          impotentes, inúteis, culpadas, irritadas, magoadas...
			        </p>
			        <p>
			          <Link to = "/Depressao"><Button bsStyle="primary">Ler Mais</Button></Link>
			        </p>
			      </Thumbnail>
			    </Col>
			    <Col xs={12} md={4} sm={6}>
			      <Thumbnail src={ansiedade} alt="242x200">
			        <h3>Ansiedade</h3>
			        <p>Ansiedade, ânsia ou nervosismo é uma característica biológica do ser humano e animais, que antecede momentos de perigo real ou imaginário,
							 marcada por sensações corporais desagradáveis, tais como uma sensação de vazio no estômago, coração batendo rápido, medo intenso,
							  aperto no tórax, transpiração, e outras alterações as...
			         </p>
			        <p>
			          <Link to = "/Ansiedade"><Button bsStyle="primary">Ler Mais</Button></Link>
			        </p>
			      </Thumbnail>
			    </Col>
			    <Col xs={12} md={4} sm={6}>
			      <Thumbnail src={estresse} alt="242x200">
			        <h3>Estresse</h3>
			        <p>O termo estresse, agaste ou consumição, foi usado por Selye (1976) com um sentido neutro - nem positivo nem negativo. Ele o definiu como
							 "reação não específica do corpo a qualquer tipo de exigência" ou falta de esportes físicos. A partir dessa definição Selye diferencia dois
							  tipos de estresse: o eustresse (eustress) ou agaste...
			        </p>
			        <p>
			          <Link to = "/Estresse"><Button bsStyle="primary">Ler Mais</Button></Link>
			        </p>
			      </Thumbnail>
			    </Col>
			</Row>
		);
	}
}
