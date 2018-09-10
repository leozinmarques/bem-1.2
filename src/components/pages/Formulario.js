import React from 'react';
import axios from 'axios';
import {FormGroup, FormControl, Button, Modal, Grid, Row, Col, Radio, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import '../../styles/css/Formulario.css';

var respostas = {};

export default class Formulario extends React.Component{
	constructor(){
		super();
		this.state = {
			questionarios:[], questionario:{
				perguntas: [],
				descricao: ""
			}, respostas: [], questId: "", resultado: { codigo: '',faixas: []}, modalResult: false
		}

		this.onChange = (evento) => {
		const aux = Object.assign({}, this.state);
		const campo = evento.target.name;
		aux[campo] = evento.target.value;
		this.setState(aux);
	};

		this.onSubmit = (evento) =>{
			let res = {
				questionario_id: this.state.questionario.id,
				respostas: []
			}
			console.log(this.state.questionario);
			for (var prop in respostas) {
				res.respostas.push({'pergunta_id': prop, 'alternativa_id': respostas[prop]});
			}

			axios.post('https://bemapi.herokuapp.com/resultado', res)
			.then((response) => {
				console.log(response.data);
				this.setState({
					resultado: response.data,
					modalResult: true
				});
			})
			.catch((error) => {
				console.log(error);
			});
			evento.preventDefault();
		};

		this.handleChange = (evento) => {
			evento.persist();
			respostas[evento.target.name] = evento.target.value;
			console.log(evento.target.name);
			console.log(evento.target.value);
		}

		this.handleChangeQues = (evento) => {
      evento.persist();

			if(evento.target.value === "default"){
				this.setState({
					questionario: {
						perguntas:[]
					}
				});
			}else{
	      axios.get('https://bemapi.herokuapp.com/questionario/' + evento.target.value)
	  		.then((response) => {
					respostas = {};
	  			this.setState({
	  				questionario: response.data
	  			});
					response.data.perguntas.map((pergunta)=>  {
						respostas[pergunta.id] = 0;
					});
	  		})
	  		.catch((error) =>{
	  			console.log(error.response);
	  		});
	    }
		}

		this.onHide = () => {
			this.setState({
				modalResult: false
			})
		}
	}

  	validateForm() {
      return this.state.questionario.perguntas.length > 0;
    }

	componentWillMount(){
		axios.get('https://bemapi.herokuapp.com/questionario')
		.then((response) => {
			this.setState({
				questionarios: response.data
			});
		})
		.catch((error) =>{
			console.log(error.response);
		});
	}

  render(){
    return(
      <Grid>
      <Row>
        <Col sm={1} xs={1} md={1} />
        <Col sm={10} xs={10} md={10} >
          <FormGroup>
            <h1>Questionário</h1>
            <FormControl onChange={this.handleChangeQues} componentClass="select" placeholder="select">
                    <option value='default'>Escolha o Questionário</option>
                {
                  this.state.questionarios.map((row,index) => (
                    <option value={row.id} keyId={index}>{row.titulo}</option>
                  ))
                }
            </FormControl>
          </FormGroup>
          {
            (this.validateForm() ? <h2>Descrição</h2> : <h2></h2>)
          }

          <h5>{this.state.questionario.descricao}</h5>

          <div>
          {
    				this.state.questionario.perguntas.map((row, index) => (
    						<FormGroup onChange={this.handleChange} id={row.id} controlId={row.id}>
	    							{index+1}. {row.descricao}
	    	                  		<br/><Radio value="0" name={row.id} inline>0</Radio>
	    	                  		<br/><Radio value="1" name={row.id} inline>1</Radio>
	    	                  		<br/><Radio value="2" name={row.id} inline>2</Radio>
	    	                  		<br/><Radio value="3" name={row.id} inline>3</Radio>
	    	                  		
	    	                  		<ButtonToolbar>
									   <ToggleButtonGroup type="radio" name={row.id}>
									     <ToggleButton value="0">0</ToggleButton>
									     <ToggleButton value="1">1</ToggleButton>
									     <ToggleButton value="2">2</ToggleButton>
									     <ToggleButton value="3">3</ToggleButton>
									    </ToggleButtonGroup>
									</ButtonToolbar>
	    	                </FormGroup>
    			))
    			}
          </div>

          <Button disabled={!this.validateForm()} onClick={this.onSubmit} bsStyle="success">Enviar</Button>

          <Modal show={this.state.modalResult}>
			<Modal.Header>
				<h1> Resultado {this.state.questionario.titulo}</h1>
			</Modal.Header>
	        <Modal.Body>
	        	<div className="alignMeio">
				<img src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + this.state.resultado.codigo}/>
				<h4>{this.state.resultado.codigo}</h4>
				</div>
				{
					this.state.resultado.faixas.map((row, index) => (
						<div>
						<h2>{row.escala.descricao}: {row.titulo}</h2>
						<p>{row.descricao}</p>
						</div>
					))
				}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.onHide}>Fechar</Button>
			</Modal.Footer>
	      </Modal>

        </Col>
        <Col sm={1} xs={1} md={1} />
      </Row>
      </Grid>
    );
  }

}
