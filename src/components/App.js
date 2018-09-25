import React, { Component } from 'react';
import logo from '../logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {isAdmin} from '../tils/Auth.js';
import Ansiedade from './content/Ansiedade.js';
import Estresse from './content/Estresse.js';
import Depressao from './content/Depressao.js';
import Sobre from './content/Sobre.js';
import Home from './pages/Home.js';
import Formulario from './pages/Formulario.js';
import Questionario from './pages/Questionario.js';
import Perguntas from './pages/Perguntas.js';
import Login from './pages/Login.js';
import CadAdmin from './pages/CadAdmin.js';
import NavbarBem from './layout/NavbarBem.js';
import FooterBem from './layout/FooterBem.js';
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
            <Route exact path="/Ansiedade" component={Ansiedade} />
            <Route exact path="/Estresse" component={Estresse} />
            <Route exact path="/Depressao" component={Depressao} />
            <PrivateRoute exact path="/Questionario" component={Questionario} />
            <PrivateRoute exact path="/Perguntas" component={Perguntas} />
            <PrivateRoute exact path="/CadAdmin" component={CadAdmin} />
          </Switch>
          <FooterBem />
        </div>
      </Router>
    );
  }
}

export default App;
