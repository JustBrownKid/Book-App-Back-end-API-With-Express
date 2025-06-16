const sendResponse = (res, statusCode, message, success = true, data = null) => {
  return res.status(statusCode).json({
    message,
    status: statusCode,
    success,
    data
  });
};

module.exports = sendResponse;
