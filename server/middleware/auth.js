const jwt = require('jsonwebtoken');
const {User} = require('../api/auth/models/user');

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
        const decodedPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        const foundUser = await User.findOne({
            _id: decodedPayload.user._id
        })
        
        // User not found
        if(!foundUser){
            res.status(400).send('User does not exist!');
            return;
        }

        req.user = foundUser;
        next()
    }
    catch (ex){
        console.log(ex)
        res.status(400).send('Invalid Token')
    }
}