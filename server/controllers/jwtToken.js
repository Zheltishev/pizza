const jwt = require('jsonwebtoken');
const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
  })

const createToken = (userId, time = '1h') => {
    return jwt.sign({ userId: userId }, process.env.SECRET_KEY, {expiresIn: time})
}

const writeTokenInDB = async (userId, accessToken, refreshToken) => {
    const queryTokens = `INSERT INTO tokens (token_owner, token_access, token_refresh) VALUES ($1, $2, $3)`
    const values = [ userId, accessToken, refreshToken ]
    
    await pool.query(queryTokens, values)
}

const decodedToken = (token) => {
    const info = jwt.verify(token, process.env.SECRET_KEY)

    return {
        userId: info.userId,
        expTime: info.exp
    }
}

module.exports = {
    createToken,
    writeTokenInDB,
    decodedToken
}