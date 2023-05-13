const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  console.log('Checking authentication');
  try {
    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
      req.user = null;
    } else {
      const token = req.cookies.nToken;
      const decodedToken = await jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = checkAuth;
