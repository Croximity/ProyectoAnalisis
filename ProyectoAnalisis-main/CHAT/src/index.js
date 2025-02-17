import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { Provider } from 'react-redux';
import store from './store';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCV8ZQXFlbPQ21eyZ4Mpo03YR5Dbfit948",
  authDomain: "web-messenger-8b929.firebaseapp.com",
  projectId: "web-messenger-8b929",
  storageBucket: "web-messenger-8b929.firebasestorage.app",
  messagingSenderId: "959039960780",
  appId: "1:959039960780:web:71f2b30fc535f3f7d2f469",
  measurementId: "G-JXC8L487SM"
};

// Inicializas Firebase sin asignarlo a una variable
initializeApp(firebaseConfig);  // Ya no necesitas asignarlo a 'firebaseApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
