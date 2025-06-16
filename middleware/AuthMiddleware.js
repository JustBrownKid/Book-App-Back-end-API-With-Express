const sendResponse = require('../utils/response');

const AuthMiddleware = (req, res, next) => {
  console.log('Middleware triggered');

  if (!req.body || !req.body.data) {
    return sendResponse(res, 403, 'Access denied by middleware', false);
  }
  next();
};
 
module.exports = AuthMiddleware