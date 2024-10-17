const admin = require('firebase-admin');
const auth = admin.auth();
// const cookieParser = require('cookie-parser');


const checkAuth = (req, res, next) => {
  const idToken = req.cookies.token;

  if (!idToken) {
    return res.redirect('/login');
  }

  auth.verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      next();
    })
    .catch(error => {
      console.error('Error verificando token:', error);
      res.redirect('/login');
    });
};

module.exports = checkAuth