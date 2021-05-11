const express = require('express');
const morgan = require('morgan')
const winston = require('winston');

const app = express()

require('./startup/logging')()
require('./startup/routes')(app)

if(app.get('env') === 'development') {
    app.use(morgan('tiny'))   // Request Logging
    winston.info('Morgan enabled....')
}

module.exports = app