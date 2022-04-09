const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested content was not found"));
}

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next("There was a problem");
  } else {
    if (err.message) {
      res.status(err.status || 500).send(err.message);
    } else {
      res.send("There was a problem");
    }
  }
}

module.exports = { notFoundHandler, errorHandler };
