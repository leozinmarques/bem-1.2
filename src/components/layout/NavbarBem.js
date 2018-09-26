import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
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
			<NavItem eventKey={3}>
			<Link to = "/Sobre"> Sobre Nós</Link>
			</NavItem>
			<NavDropdown eventKey={4} title="Trantornos" id="basic-nav-dropdown">
			<MenuItem eventKey={4.1}><Link to ="/Depressao">Depressão</Link></MenuItem>
			<MenuItem eventKey={4.2}><Link to ="/Estresse">Estresse</Link></MenuItem>
			<MenuItem eventKey={4.3}><Link to ="/Ansiedade">Ansiedade</Link></MenuItem>
			</NavDropdown>
			{
				(isAdmin()) ?
				(<NavDropdown eventKey={6} title="Admin"  id="basic-nav-dropdow n">
				<MenuItem eventKey={6.1}><Link to ="/Questionario">Questionario</Link></MenuItem>
				<MenuItem eventKey={6.2}><Link to ="/Perguntas">Perguntas</Link></MenuItem>
				<MenuItem eventKey={6.3}><Link to ="/CadAdmin">Cadastro Admin</Link></MenuItem>
				</NavDropdown>) : ("")
			}
			{
				(!isLoggedIn()) ? (<NavItem eventKey={5}> <Link to ="/Login">Login</Link> </NavItem>) : (<NavItem eventKey={4}> <Link to ="/" onClick={() => logout()}> Logout </Link> </NavItem>)
			}

			</Nav>
			</Navbar.Collapse>
			</Navbar>
			);
	}
}

export default NavbarBem;
