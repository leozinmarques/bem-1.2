import React from 'react';
import {getToken} from '../../tils/Auth';
import axios from 'axios'
import { Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from "react-bootstrap";


export default class Login extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      email: "",
      senha: "",
      papel_id: 1
    };

    var config = {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    }

    this.handleSubmit = event => {
      const user = {
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha,
        papel_id: this.state.papel_id
      }

      axios.post('https://bemapi.herokuapp.com/usuario', user, config)
      .then(res => {
        if(res.status === 200){
          alert('Cadastro realizado com sucesso!');
        }
      }).catch(error => {
        if(error.response.status === 500){
          alert('Email já registrado!')
        }
      })
      event.preventDefault();
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.senha.length > 0 && this.state.nome.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render(){
    return(
      <Grid>
      <Row>
      <Col sm={3} xs={3} md={3}  />
      <Col sm={6} xs={6} md={6}>
      <h1>Cadastro Admin</h1>
      <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="nome" bsSize="large">
      <ControlLabel>Nome</ControlLabel>
      <FormControl
      autoFocus
      type="nome"
      value={this.state.nome}
      onChange={this.handleChange}
      />
      </FormGroup>
      <FormGroup controlId="email" bsSize="large">
      <ControlLabel>Email</ControlLabel>
      <FormControl
      autoFocus
      type="email"
      value={this.state.email}
      onChange={this.handleChange}
      />
      </FormGroup>
      <FormGroup controlId="senha" bsSize="large">
      <ControlLabel>Senha</ControlLabel>
      <FormControl
      value={this.state.senha}
      onChange={this.handleChange}
      type="password"
      />
      </FormGroup>
      {/*<FormGroup controlId="papel_id" bsSize="small">
      <ControlLabel>Tipo de Cadastro</ControlLabel>
      <FormControl componentClass="select" value={this.state.papel_id} onChange={this.handleChange} type="papel_id">
      <option value="0">Psicologo</option>
      <option value="1">Administrador</option>
      </FormControl>
    </FormGroup> */}
    <Button
    block
    bsSize="large"
    disabled={!this.validateForm()}
    type="submit"
    >
    Cadastrar
    </Button>
    </form>
    </Col>
    <Col sm={3} xs={3} md={3}  />
    </Row>
    </Grid>
    );
  }
}
