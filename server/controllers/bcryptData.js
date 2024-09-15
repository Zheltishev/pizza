const bcrypt = require('bcrypt');
const saltRounds = 8;

const encodeData = (data) => {
    return bcrypt.hashSync(data, saltRounds)
}

const decodePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
    encodeData,
    decodePassword
}