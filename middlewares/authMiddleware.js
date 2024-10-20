const admin = require('firebase-admin');
const auth = admin.auth();

const checkAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    // Primero intentamos verificarlo como un ID token
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken; // Si es un ID token válido, se guarda en req.user
    return next();
  } catch (error) {
    console.error('Error verificando ID token:', error);
    // Si la verificación del ID token falla, intentamos verificar como custom token (modificación para el testing)
    try {
      const customToken = await auth.createCustomToken(token); 
      const decodedCustomToken = await auth.verifyIdToken(customToken);
      req.user = decodedCustomToken; // Guardar el usuario decodificado
      return next();
    } catch (customError) {
      console.error('Error verificando custom token:', customError);
      return res.redirect('/login');
    }
  }
};

module.exports = checkAuth;
