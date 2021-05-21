const jwt = require('jsonwebtoken');
const {User} = require('../api/auth/models/user');
const firebase = require('../config/firebase-admin-config')

function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

module.exports = async function (req, res, next){
    const token = extractToken(req)
    if(!token) return res.status(401).send('Access Denied')

    try{
        const userPayload = await firebase.auth().verifyIdToken(token);
        
        // User not found
        if(!userPayload){
            res.status(400).send('User does not exist!');
            return;
        }

        req.user = userPayload;
        next()
    }
    catch (ex){
        console.log(ex)
        res.status(400).send('Invalid Token')
    }
}