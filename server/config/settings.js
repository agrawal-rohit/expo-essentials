const settings = {
  dev: {
    port: 8000,
    environment: 'development',
    debug: "nawvel:*",
    databaseUrl: "mongodb://mongo:27017",
    firebaseDatabaseUrl: 'https://coinpace-dev.firebaseio.com'
  },
  staging: {

  },
  prod: {},
};

const getCurrentSettings = () => {
  if (process.env.NODE_ENV == "development") return settings.dev;

  if (process.env.NODE_ENV == "staging") return settings.staging;

  return settings.prod;
};

module.exports = getCurrentSettings();
