import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './style.css';

/**
* @author
* @function Header
**/

const Header = (props) => {
  const location = useLocation();

  return (
    <header className="header">
      <div style={{ display: 'flex' }}>
        <div className="logo">Web_messenger</div>
        <div>  </div>
        {/* Mostrar "Login" y "Sign up" solo cuando no estamos en la homepage */}
        {location.pathname !== '/homepage' && (
          <ul className="leftMenu">
            <li><NavLink to={'/login'}>Login</NavLink></li>
            <li><NavLink to={'/signup'}>Sign up</NavLink></li>
          </ul>
        )}
      </div>

      {/* Mostrar el nombre de usuario solo en la homepage */}
      {location.pathname === '/homepage' && (
        <div style={{ margin: '20px 0', color: '#fff', fontWeight: 'bold' }}>Hi Riz</div>
      )}

      {/* Mostrar "Logout" solo en la homepage */}
      {location.pathname === '/homepage' && (
        <ul className="menu">
          <li>
            <NavLink to={'/login'}>Logout</NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
