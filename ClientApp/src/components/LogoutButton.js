import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <NavLink tag={Link} className="text-dark"  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} >Log out</NavLink>
  );
};

export default LogoutButton;