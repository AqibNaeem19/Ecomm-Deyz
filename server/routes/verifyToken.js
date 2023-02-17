const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(403).json({
          status: "not authenticated",
          message: "Token invalid or expired"
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      status: "Authentication required",
      message: "please signup or login first"
    });
  }
}


const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        status: "Authorization failed",
        message: "You are not allowed to do that"
      });
    }
  });
};


const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        status: "Authorization failed",
        message: "You are not admin and cannot perform the operation"
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};