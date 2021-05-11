const app = require('./server.js')
const winston = require('winston');

require('./startup/db')()

if(!process.env.JWT_PRIVATE_KEY){
    winston.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)
}

const port = process.env.PORT || 8000
app.listen(port, () => {winston.info(`Listening on port ${port}...`)})
