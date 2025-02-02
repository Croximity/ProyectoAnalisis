import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { authConstanst } from "./constants";

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
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Firestore correctamente inicializado

// Acción para registrar un usuario
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });

    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      const firebaseUser = userCredential.user;

      console.log("✅ Usuario registrado:", firebaseUser);

      // Actualizar perfil con nombre completo
      await updateProfile(firebaseUser, {
        displayName: `${user.firstName} ${user.lastName}`
      });

      console.log("✅ Perfil actualizado con nombre:", firebaseUser.displayName);

      // Guardar usuario en Firestore
      await addDoc(collection(db, "users"), {
        firstName: user.firstName,
        lastName: user.lastName,
        uid: firebaseUser.uid, // ✅ Se usa el UID correcto
        email: user.email,
        createdAt: new Date()
      });

      console.log("✅ Usuario guardado en Firestore");

      // Guardar usuario en localStorage
      const loggedInUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        uid: firebaseUser.uid,
        email: user.email
      };
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      console.log("✅ Usuario guardado en localStorage");

      dispatch({
        type: `${authConstanst.USER_LOGIN}_SUCCESS`,
        payload: { user: loggedInUser }
      });

    } catch (error) {
      console.error("❌ Error en el registro:", error.message);
      dispatch({ 
        type: `${authConstanst.USER_LOGIN}_FAILURE`,
        payload: { error: error.message }
      });
    }
  };
};
