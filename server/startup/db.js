const winston = require("winston");
const mongoose = require("mongoose");
const settings = require('../config/settings')

module.exports = function () {
  mongoose
    .connect(`${settings.databaseUrl}/app`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      winston.info("Connected to Mongodb");
    })
    .catch((err) =>
      winston.error("Could not connect to Mongodb database: ", err)
    );
};
