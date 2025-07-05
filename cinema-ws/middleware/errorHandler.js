const AppError = require("../exceptions/AppError");

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error. Please try again later.",
    });
  }
};

module.exports = errorHandler;
