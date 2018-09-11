import React, {Component} from 'react';
import {Col, Row, Thumbnail, Button} from 'react-bootstrap';
import ansiedade from '../../styles/images/ansiedade.jpg';
import depressao from '../../styles/images/depressao.jpg';
import estresse from '../../styles/images/estresse.jpg';

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
			          impotentes, inúteis, culpadas, irritadas, magoadas ou inquietas.
			        </p>
			        <p>
			          <Button bsStyle="primary">Ler Mais</Button>
			        </p>
			      </Thumbnail>
			    </Col>
			    <Col xs={12} md={4} sm={6}>
			      <Thumbnail src={ansiedade} alt="242x200">
			        <h3>Ansiedade</h3>
			        <p>Ansiedade, ânsia ou nervosismo é uma característica biológica do ser humano e animais,
			         que antecede momentos de perigo real ou imaginário, marcada por sensações corporais desagradáveis,
			         tais como uma sensação de vazio no estômago, coração batendo rápido, medo intenso, aperto no tórax,
			         transpiração, e outras alterações associadas à disfunção do sistema nervoso autônomo
			         (ver sintomas mais frequentes abaixo relacionados).
			         </p>
			        <p>
			          <Button bsStyle="primary">Ler Mais</Button>
			        </p>
			      </Thumbnail>
			    </Col>
			    <Col xs={12} md={4} sm={6}>
			      <Thumbnail src={estresse} alt="242x200">
			        <h3>Estresse</h3>
			        <p>O termo estresse, agaste ou consumição, foi usado por Selye (1976) com um sentido neutro - nem positivo nem negativo.
			         Ele o definiu como "reação não específica do corpo a qualquer tipo de exigência" ou falta de esportes físicos.
			         A partir dessa definição Selye diferencia dois tipos de estresse: o eustresse (eustress) ou agaste,
			         que indica a situação em que o indivíduo possui meios (físicos, psíquicos...) de lidar com a situação,
			         e o distresse (distress) ou esgotamento, que indica a situação em que a exigência é maior do que os meios para enfrentá-la.
			        </p>
			        <p>
			          <Button bsStyle="primary">Ler Mais</Button>
			        </p>
			      </Thumbnail>
			    </Col>
			</Row>
		);
	}
}
