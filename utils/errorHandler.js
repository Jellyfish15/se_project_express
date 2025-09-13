
function errorHandler(err, req, res, next) {

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err);

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
}

module.exports = errorHandler;
