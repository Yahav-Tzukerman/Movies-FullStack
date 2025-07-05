module.exports = (req, res, next) => {
  const key = req.header("x-api-key");
  if (!key || key !== process.env.CINEMA_WS_API_KEY) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
