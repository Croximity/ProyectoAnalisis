import React, { useState } from 'react';
import Card from '../../Componentes/Layout/UI/Card';
import Layout from '../../Componentes/Layout';
import './style.css'; 
import { signup } from './../../actions';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    // ✅ Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      alert("❌ La contraseña debe tener al menos 6 caracteres");
      return; // 🚨 Evita que el formulario se envíe
    }

    const user = {
      firstName, lastName, email, password
    };

    dispatch(signup(user));

    // ✅ Mostrar alerta de éxito SOLO si el registro fue exitoso
    alert("✅ Usuario creado con éxito!");

    // ✅ Redirigir al login después de cerrar la alerta
    navigate('/login');
  };

  return (
    <Layout>
      <div className="registerContainer">
        <Card>
          <form onSubmit={registerUser}>
            <h3>Sign Up</h3>

            <div className="input-group">
              <input
                name="firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
            </div>

            <div className="input-group">
              <input
                name="lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>

            <div className="input-group">
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

            <div className="input-group">
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (mínimo 6 caracteres)"
                required
              />
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterPage;
