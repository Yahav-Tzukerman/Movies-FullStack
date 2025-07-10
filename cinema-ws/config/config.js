require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
  env: process.env.APP_ENV || "development",
  dbUri:
    process.env.APP_ENV == "production"
      ? process.env.MONGO_URI
      : process.env.MONGO_URI_LOCAL,
  subsWsApiKey: process.env.SUBS_WS_API_KEY,
  subsWsUrl: process.env.APP_ENV == "production" ? process.env.SUBS_WS_URL_PROD : process.env.SUBS_WS_URL_LOCAL,
};
