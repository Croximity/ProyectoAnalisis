import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../Componentes/Layout';
import { getFirestore, collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { serverTimestamp } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCV8ZQXFlbPQ21eyZ4Mpo03YR5Dbfit948",
  authDomain: "web-messenger-8b929.firebaseapp.com",
  projectId: "web-messenger-8b929",
  storageBucket: "web-messenger-8b929.firebasestorage.app",
  messagingSenderId: "959039960780",
  appId: "1:959039960780:web:71f2b30fc535f3f7d2f469",
  measurementId: "G-JXC8L487SM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Escuchar cambios en la autenticación
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // Obtener lista de usuarios en tiempo real
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    });

    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    if (selectedUser && currentUser) {
      // Obtener los mensajes entre el usuario actual y el usuario seleccionado
      const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

      const unsubscribeMessages = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs
          .map(doc => doc.data())
          .filter(msg =>
            (msg.senderId === currentUser.uid && msg.receiverId === selectedUser.uid) ||
            (msg.senderId === selectedUser.uid && msg.receiverId === currentUser.uid)
          );

        setMessages(msgs);
      });

      return () => unsubscribeMessages();
    }
  }, [selectedUser, currentUser]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !currentUser) return;

    await addDoc(collection(db, "messages"), {
      senderId: currentUser.uid,
      receiverId: selectedUser.uid,
      text: newMessage,
      createdAt: serverTimestamp()  // Asegúrate de usar serverTimestamp()
    });

    setNewMessage("");
  };

  // Formatear la hora solo si el timestamp es válido
  const formatTime = (timestamp) => {
    if (timestamp && timestamp.toDate) {  // Verifica si 'timestamp' es un objeto de tipo Timestamp
      const date = timestamp.toDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
    return '';  // Retorna una cadena vacía si el timestamp no es válido
  };

  return (
    <Layout>
      <section className="container">
        {/* Lista de usuarios */}
        <div className="listOfUsers">
          {users.map(user => (
            user.uid !== currentUser?.uid && ( // No mostrar el usuario actual en la lista
              <div 
                key={user.id} 
                className={`displayName ${selectedUser?.uid === user.uid ? "active" : ""}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="displayPic">
                  <img 
                    src="https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg" 
                    alt={user.firstName} 
                  />
                </div>
                <div style={{ margin: '0 10px' }}>
                  <span style={{ fontWeight: 500 }}>{user.firstName} {user.lastName}</span>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Área de chat */}
        <div className="chatArea">
          <div className="chatHeader">
            {selectedUser ? `Chat con ${selectedUser.firstName} ${selectedUser.lastName}` : "Selecciona un usuario"}
          </div>

          <div className="messageSections">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={{ textAlign: msg.senderId === currentUser?.uid ? 'right' : 'left' }}
              >
                <p className="messageStyle">{msg.text}</p>
                <span className="messageTime">{formatTime(msg.createdAt)}</span>  {/* Hora del mensaje */}
              </div>
            ))}
          </div>
        </div>

        {/* Controles del chat */}
        {selectedUser && (
          <div className="chatControls">
            <textarea 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;
