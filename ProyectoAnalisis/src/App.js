import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './containers/Loginpage';
import RegisterPage from './containers/RegisterPage';
import homepage from './containers/Homepage';
import PrivateRoute from './Componentes/privateRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          
          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<homepage />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
