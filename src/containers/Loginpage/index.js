import React, { useState } from 'react';
import Layout from '../../Componentes/Layout';
import Card from '../../Componentes/Layout/UI/Card';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signin } from '../../actions/auth.actions'; // Importa la acción correcta
import './style.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita recargar la página

    console.log("🔄 Enviando datos de login:", { email, password }); // 📌 Debug

    try {
      const user = await dispatch(signin(email, password)); // Llamar a la acción signin
      console.log("✅ Login exitoso:", user); // 📌 Debug
      alert(`Bienvenido, ${user.displayName || "Usuario"} 👋`); // Mensaje en la UI
      navigate('/homepage'); // Redirigir después del login
    } catch (error) {
      console.error("❌ Error en el login:", error.message);
      alert("❌ Error de inicio de sesión: " + error.message); // Muestra el error en la UI
    }
  };

  return (
    <Layout>
      <div className="loginContainer">
        <Card>
          <form onSubmit={handleLogin}>
          <h3>Iniciar Sesión</h3>

            <input
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />

            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
              required
            />

            <div>
              <button type="submit">Login</button> 
            </div>
            
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
