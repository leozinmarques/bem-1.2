import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Row} from 'react-bootstrap';
import {isAdmin, isLoggedIn, logout} from '../../tils/Auth';
import logo from '../../styles/images/bem-logo.png';
import '../../styles/css/NavbarBem.css';

class NavbarBem extends Component {
	render(){
		return(
			<Navbar collapseOnSelect>
			  <Navbar.Header>
						<Navbar.Brand>
			      	<Link to ="/"> <img src={logo} className="logo"/> </Link>
						</Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Nav pullRight>
			      <NavItem eventKey={1}>
			        Jogo
			      </NavItem>
			      <NavItem eventKey={2}>
			        <Link to = "/Formulario"> Formulario </Link>
			      </NavItem>
			      <NavDropdown eventKey={3} title="Trantornos" id="basic-nav-dropdown">
			        <MenuItem eventKey={3.1}>Depressão</MenuItem>
			        <MenuItem eventKey={3.2}>Estresse</MenuItem>
			        <MenuItem eventKey={3.3}>Ansiedade</MenuItem>
			      </NavDropdown>
						{
							(isAdmin()) ?
							(<NavDropdown eventKey={5} title="Admin"  id="basic-nav-dropdow n">
								<MenuItem eventKey={5.1}><Link to ="/Questionario">Questionario</Link></MenuItem>
				        <MenuItem eventKey={5.2}><Link to ="/Perguntas">Perguntas</Link></MenuItem>
				        <MenuItem eventKey={5.3}>Cadastro Admin</MenuItem>
								<MenuItem eventKey={5.4}>Cadastro Psicologo</MenuItem>
							</NavDropdown>) : ("")
						}
						{
						(!isLoggedIn()) ? (<NavItem eventKey={4}> <Link to ="/Login">Login</Link> </NavItem>) : (<NavItem eventKey={4}> <Link to ="/" onClick={() => logout()}> Logout </Link> </NavItem>)
						}

			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavbarBem;
