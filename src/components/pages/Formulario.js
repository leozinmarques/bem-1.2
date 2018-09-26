import React from 'react';
import axios from 'axios';
import Loader from '../layout/Loading.js';
import {FormGroup, FormControl, Button, Grid, Row, Col, Radio} from 'react-bootstrap';
import '../../styles/css/Formulario.css';

var respostas = {};

export default class Formulario extends React.Component{
	constructor(){
		super();
		this.state = {
			questionarios:[], questionario:{
				perguntas: [],
				descricao: ""
			}, respostas: [], questId: "", resultado: { codigo: '',faixas: []}, modalResult: false, loading: true
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
					response.data.perguntas.map((pergunta) =>  {
						respostas[pergunta.id] = 0;
					});
					console.log(this.state.questionario)
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
				questionarios: response.data,
				loading: false
			});
		})
		.catch((error) =>{
			console.log(error.response);
		});
	}

	render(){
		if(this.state.loading){
			return(
				<Loader className="load" loading={this.state.loading}/>
			);
		}
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
					((this.validateForm())? (<h3>Descrição</h3>) : (<h3></h3>))
				}

				<p className="desc">{this.state.questionario.descricao}</p>

				<div>
				{
					this.state.questionario.perguntas.map((row, index) => (
						<FormGroup onChange={this.handleChange} id={row.id} controlId={row.id}>
						<p className="bold">{index+1}. {row.descricao}</p>
						<div className="perguntas">	   					
						{   	                  			
							row.alternativas.map((alt) => (
							<Radio value={alt} name={row.id} inline>{alt.descricao}</Radio>
							))
						}
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

