const jwt = require('jsonwebtoken');

const createToken = (userId, time = '1h') => {
    return jwt.sign({ userId: userId }, process.env.SECRET_KEY, {expiresIn: time})
}

module.exports = {
    createToken
}