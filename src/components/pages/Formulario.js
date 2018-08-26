import React from 'react';
import axios from 'axios';
import {FormGroup, FormControl, Button, Modal, Grid, Row, Col} from 'react-bootstrap'

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
			respostas[evento.target.id] = evento.target.value;
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
    						<FormGroup controlId={row.id}>
    							{index+1}. {row.descricao}
    							<div className="select-size">
    							<FormControl onChange={this.handleChange} componentClass="select" placeholder="select">
    	                  <option value='0'>0</option>
    										<option value='1'>1</option>
    										<option value='2'>2</option>
    										<option value='3'>3</option>
    	          	</FormControl>
    							</div>
    						</FormGroup>
    			))
    			}
          </div>

          <Button disabled={!this.validateForm()} onClick={this.onSubmit} bsStyle="success">Enviar</Button>

        </Col>
        <Col sm={1} xs={1} md={1} />
      </Row>
      </Grid>
    );
  }

}
