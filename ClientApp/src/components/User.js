import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Dropdown } from 'react-bootstrap';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


const User = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
        <div>
          <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    {user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item><NavLink tag={Link} className="text-dark" to="/orders">My orders</NavLink></Dropdown.Item>
                    <Dropdown.Item ><NavLink tag={Link} className="text-dark" to="/mycard">My card</NavLink></Dropdown.Item>
                    <Dropdown.Item ><NavLink tag={Link} className="text-dark" to="/items/wardrobe"></NavLink></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
          <LogoutButton />
        </div>
      ) : (
        <div>
          <LoginButton />
        </div>
      )
  );
};

export default User;