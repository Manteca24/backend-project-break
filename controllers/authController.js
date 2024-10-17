const admin = require('firebase-admin');
const auth = admin.auth();
const { baseHTML, registerForm, loginForm } = require('../templates/templates');

// mostrar el formulario de inicio de sesión
const showLogin = async (req, res) => {
    const form = loginForm();
    const html = baseHTML(form, false); // user=false porque empieza no logado
    res.send(html);
};

// registrar un nuevo usuario en Firebase Authentication
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        await auth.createUser({ // Nuevo usuario en Firebase Authentication
            email,
            password
        });
        res.redirect('/login');
    } catch (error) {
        console.error('Error creando nuevo usuario', error);
        res.redirect('/register');
    }
};

// mostrar el formulario de registro
const showRegister = async (req, res) => {
    const form = registerForm();
    const html = baseHTML(form, false);
    res.send(html);
};

// cerrar sesión
const logout = async (req, res) => {
    res.clearCookie('token'); // Limpia la cookie 'token' que contiene el ID token del usuario logueado
    res.redirect('/login');
};

// iniciar sesión verificando el ID token de Firebase
const login = async (req, res) => {
    const { idToken } = req.body;

    try {
        await auth.verifyIdToken(idToken); 
        // Si el token es válido, guarda el token en una cookie que es accesible solo por el servidor
        res.cookie('token', idToken, { httpOnly: true, secure: false }); // secure es true en HTTPs
        res.json({ success: true });
    } catch (error) {
        console.error('Error verificando ID token:', error);
        res.status(401).json({ error: 'token no válido' });
    }
};

module.exports = {
    showLogin,
    register,
    showRegister,
    logout,
    login,
};
