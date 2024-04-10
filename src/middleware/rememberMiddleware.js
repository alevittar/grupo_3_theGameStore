// rememberMeMiddleware.js

const rememberMeMiddleware = (req, res, next) => {
    if (req.cookies.remember_token && !req.session.usuario) {
      const userData = decodeRememberToken(req.cookies.remember_token);
      if (userData) {
        req.session.usuario = userData;
      }
    }
    next();
  };
  
  const decodeRememberToken = (token) => {
    try {
      const userData = decodeURIComponent(atob(token));
      return JSON.parse(userData);
    } catch (error) {
      return null;
    }
  };
  
  module.exports = rememberMeMiddleware;
  