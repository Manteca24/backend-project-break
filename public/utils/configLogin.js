import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyByvg0TKJGjIopY4_5ekZ7szgC6ziuKIag",
    authDomain: "fir-auth-46ec2.firebaseapp.com",
    projectId: "fir-auth-46ec2",
    storageBucket: "fir-auth-46ec2.appspot.com",
    messagingSenderId: "865385759009",
    appId: "1:865385759009:web:58e2c5faa573e192c63e60"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = async (ev) => {
  ev.preventDefault();
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.textContent = '';

  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      mensajeDiv.textContent = 'Email and password are required';
      return;
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const idToken = await userCredential.user.getIdToken(); 
    
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    
    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      mensajeDiv.textContent = 'Login failed: ' + data.error;
    }
  } catch (error) {
    mensajeDiv.textContent = 'Error during login: ' + error.message;
  }
};

document.getElementById('loginButton').addEventListener('click', login);