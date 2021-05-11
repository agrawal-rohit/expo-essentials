const {User} = require('./user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {  
    it('should return a valid JWT', () => {
        const payload = {_id: mongoose.Types.ObjectId().toHexString()}
       const user = new User(payload)
       const token = user.generateAuthToken();
       const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
       expect(decoded.user).toMatchObject(payload)
    })
})