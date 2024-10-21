const jwt = require('jsonwebtoken');
const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
  })

const createToken = (userId, time = 3600) => {
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

const tokenExistInDB = async (token, tokenType) => {
  let queryToken3 = ``

  if (tokenType === 'token_access') {
    queryToken3 = `SELECT EXISTS (SELECT 1 FROM tokens WHERE token_access = $1)`
  }

  if (tokenType === 'token_refresh') {
    queryToken3 = `SELECT EXISTS (SELECT 1 FROM tokens WHERE token_refresh = $1)`
  }

  const tokenValues3 = [ token.replace('Bearer ', '') ]
  const tokenResult3 = await pool.query(queryToken3, tokenValues3)

  return tokenResult3.rows[0].exists
}
  
const tokenInfo = (token) => {
  const { userId, expTime } = decodedToken(token.replace('Bearer ', ''))

  return {
    expTime: Date.now() < expTime * 1000,
    userId: userId
  }
}

module.exports = {
    createToken,
    writeTokenInDB,
    decodedToken,
    tokenExistInDB,
    tokenInfo
}