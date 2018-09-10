import React, { Component } from 'react';
import logo from '../logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {isAdmin} from '../tils/Auth.js';
import Home from './pages/Home.js';
import Formulario from './pages/Formulario.js';
import Questionario from './pages/Questionario.js';
import Perguntas from './pages/Perguntas.js';
import Login from './pages/Login.js';
import CadAdmin from './pages/CadAdmin.js';
import NavbarBem from './layout/NavbarBem.js';
import {Grid} from 'react-bootstrap';
import '../styles/css/App.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to='/'
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavbarBem />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Formulario" component={Formulario} />
            <Route exact path="/Login" component={Login} />
            <PrivateRoute exact path="/Questionario" component={Questionario} />
            <PrivateRoute exact path="/Perguntas" component={Perguntas} />
            <PrivateRoute exact path="/CadAdmin" component={CadAdmin} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
