import React from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from "react-bootstrap";

export default class Login extends React.Component{
  constructor() {
    super();

    this.state = {
      email: "",
      senha: "",
      isLogged: false,
      isLoading: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.senha.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
	const user = {
		email: this.state.email,
		senha: this.state.senha
	}

  this.setState({
    isLoading: true
  });

	axios.get('https://bemapi.herokuapp.com/usuario/autorizar?email=' + user.email + '&senha='+ user.senha)
	.then(res =>{
    var token = res.data.token;
    sessionStorage.setItem('token', token);
    var config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }

    axios.get('https://bemapi.herokuapp.com/usuario/autenticado', config)
    .then(res => {
      sessionStorage.setItem('papel_id', res.data.papel_id);
      this.setState({
        isLogged: true,
        isLoading: false
      });
    })
    .catch(error => {
      console.log(error.response);
    })
	})
	.catch(error =>{
    console.log(error.response);
    this.setState({
      isLoading: false
    });
		if(error.response.status === 401){
      alert('Email ou Senha Invalidos');
    }

    if(error.response.status === 422){
      alert('Email Invalido');
    }
	})

    event.preventDefault();
  }

  render(){
    if(this.state.isLogged){
      return <Redirect to='./' />
    }
    return(
      <Grid>
        <Row>
          <Col sm={3} xs={3} md={3} />
          <Col sm={6} xs={6} md={6} >
          <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
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
              <Button
                bsStyle="primary"
                disabled={this.state.isLoading || !this.validateForm()}
                onClick={!this.state.isLoading ? this.handleSubmit : null}
              >
                {!this.state.isLoading ? 'Entrar' : 'Carregando'}
              </Button>
            </form>
          </Col>
          <Col sm={3} xs={3} md={3} />
        </Row>
      </Grid>
      );
  }
}
