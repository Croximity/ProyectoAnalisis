import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getFullName } from  '../../actions/auth.actions'
import './style.css';

/**
* @author
* @function Header
**/

const Header = (props) => {
  const location = useLocation();
  const fullname= getFullName();

  return (
    <header className="header">
      <div style={{ display: 'flex' }}>
        <div className="logo">JJJ_messenger</div>
        <div>  </div>
        {/* Mostrar "Login" y "Sign up" solo cuando no estamos en la homepage */}
        {location.pathname !== '/homepage' && (
          <ul className="leftMenu">
            <li><NavLink to={'/login'}>Iniciar Sesión</NavLink></li>
            <li><NavLink to={'/signup'}>Registrarse</NavLink></li>
          </ul>
        
        )}
      </div>

      {/* Mostrar el nombre de usuario solo en la homepage */}
      {location.pathname === '/homepage' && (
        <div className="Letras" style={{ margin: '20px 0', color: '#fff', fontWeight: 'bold' }}>Hola {fullname} 😊</div>
      )}

      {/* Mostrar "Logout" solo en la homepage */}
      {location.pathname === '/homepage' && (
        <ul className="menuLogout">
          <li>
            <NavLink to={'/login'}>Cerrar Sesión</NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
