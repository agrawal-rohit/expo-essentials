const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(`${process.env.DB_URL}/app`, {
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
