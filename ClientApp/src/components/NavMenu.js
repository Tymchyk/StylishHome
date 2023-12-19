import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import User from './User';
import { Dropdown } from 'react-bootstrap';


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
        <Navbar className="navbar navbar-expand-lg navbar-light bg-light" container light>
          <NavbarBrand tag={Link} to="/">Store</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    Items
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item><NavLink tag={Link} className="text-dark" to="/items">All items</NavLink></Dropdown.Item>
                    <Dropdown.Item ><NavLink tag={Link} className="text-dark" to="/items/sofa">Sofa</NavLink></Dropdown.Item>
                    <Dropdown.Item ><NavLink tag={Link} className="text-dark" to="/items/wardrobe">Wardobe</NavLink></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              <NavItem>
                <User />
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
