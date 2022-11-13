export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err.statusCode = 400;
  }
  if (err.name === "CastError") {
    err.message = `Invalid ${err.path}`;
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};

export const asyncError = (passedFunc) => (req, res, next) => {
  Promise.resolve(passedFunc(req, res, next)).catch(next);
};
