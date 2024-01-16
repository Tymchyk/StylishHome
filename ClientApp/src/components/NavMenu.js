import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import User from './User';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">StylishHome</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            <NavDropdown  className="text-dark" title="Items" id="collapsible-nav-dropdown">
              <NavDropdown.Item >
                  <NavLink tag={Link} className="text-dark" to="/items">All items</NavLink>
                  </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink tag={Link} className="text-dark" to="/items/sofa">Sofa</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item >
                <NavLink tag={Link} className="text-dark" to="/items/wardrobe">Wardrobe</NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <User />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
      </header>
    );
  }
}
