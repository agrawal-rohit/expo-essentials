const app = require('./server.js')
const winston = require('winston');
const settings = require('./config/settings')

require('./startup/db')()

const port = settings.port
app.listen(port, () => {winston.info(`Listening on port ${port}...`)})
