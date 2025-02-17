import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './containers/Loginpage';
import RegisterPage from './containers/RegisterPage';
import PrivateRoute from './Componentes/privateRoute';
import HomePage from './containers/Homepage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/homepage" element={<HomePage />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
