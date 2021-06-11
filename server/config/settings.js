const settings = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  debug: process.env.DEBUG,
  databaseUrl: process.env.DB_URL,
  firebaseDatabaseUrl: process.env.FIREBASE_DB_URL,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};

module.exports = settings;
