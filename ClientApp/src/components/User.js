import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';


const User = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div><p className="loading-text-login">Loading</p></div>;
  }

  return (
    isAuthenticated ? (
        <div>
          <NavDropdown title={user.name} id="collapsible-nav-dropdown">
            <NavDropdown.Item ><NavLink tag={Link} className="text-dark" to="/orders">My orders</NavLink></NavDropdown.Item>
            <NavDropdown.Item >
            <NavLink tag={Link} className="text-dark" to="/mycard">My card</NavLink>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item ><LogoutButton /></NavDropdown.Item>
         </NavDropdown>
        </div>
      ) : (
        <div>
          <LoginButton />
        </div>
      )
  );
};

export default User;