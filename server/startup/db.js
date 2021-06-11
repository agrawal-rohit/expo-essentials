const winston = require("winston");
const mongoose = require("mongoose");
const settings = require("../config/settings");

module.exports = async function () {
  try {
    const db = await mongoose.connect(`${settings.databaseUrl}/app`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const connection = db.connection;
    winston.info("Connected to Mongodb");
    return connection;
  } catch (err) {
    winston.error("Could not connect to Mongodb database: ", err);
  }
};
