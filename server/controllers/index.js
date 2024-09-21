const { Pool } = require('pg')
const { encodeData, decodePassword } = require('./bcryptData')
const { createToken, writeTokenInDB, decodedToken, tokenExistInDB, tokenInfo } = require('./jwtToken')
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
  })

const createNewUser = async (req, res) => {
    try {
      const { login, password } = req.body
      const defaultName = login.replace(/@.*$/,"")
      const capitalizedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1)
      const currentTime = new Date().toJSON()
      const query = `INSERT INTO users (user_id, user_name, user_password, user_email, user_created) VALUES (DEFAULT, '${capitalizedName}', $2, $1, '${currentTime}')`
      const values = [login, encodeData(password) ]
      await pool.query(query, values)
      
      res.status(200).json({ status: 200, message: 'new user created in DB' })
      
    } catch (err) {
      console.error(err)
      
      res.status(500).json({ message: err.detail })
    }
  }

const checkEmail = async (req, res) => {
    try {
      const { login } = req.body
      const query = `SELECT * FROM users WHERE user_email = '${login}'`
      const result = await pool.query(query)
  
      res.json({ message: result.rows[0].user_email})
    } catch (err) {
      res.json({ message: err.detail })
    }
  }

const login = async (req, res) => {
  try {
    const { login, password } = req.body
    const queryPassword = `SELECT user_password FROM users WHERE user_email = '${login}'`
    const hashPassword = await pool.query(queryPassword)
    const queryUserId = `SELECT user_id FROM users WHERE user_email = '${login}'`
    const userIdInfo = await pool.query(queryUserId)
    const userId = userIdInfo.rows[0].user_id
    const decodeResponse = decodePassword(password, hashPassword.rows[0].user_password)
    
    if (decodeResponse) {
      const accessToken = createToken(userId, 3600)
      const refreshToken = createToken(userId, 7200)
      let date = new Date(Date.now() + 86400e3)
      date = date.toUTCString()

      await writeTokenInDB(userId, accessToken, refreshToken)

      res
        .status(200)
        .send({
          status: 200, 
          message: 'password correct', 
          token: `token_access=${accessToken}; token_refresh=${refreshToken}; expires=${date}`
        })

      return
    } else {
      return res.status(500).json({ 
        status: 500, 
        message: 'password error',
        token: ''
      })
    }

  } catch (error) {
    res.json({ status: 500, message: 'server error: login function', token: '' })
  }
}

const checkToken = async (req, res) => {
  try {
    let token = req.headers.authorization
    const { tokenType } = req.body

    if (token && await tokenExistInDB(token, tokenType) && tokenInfo(token).expTime) {
      const queryUser = `SELECT user_name FROM users WHERE user_id = $1`
      const idValue = [ tokenInfo(token).userId ]
      const userData = await pool.query(queryUser, idValue)

      return res.status(200).json({ 
        status: 200, 
        message: 'token valid',
        userId: idValue[0],
        userName: userData.rows[0].user_name 
      })
    } else {

      return res.status(401).json({ status: 401, message: 'token error' })
    }
  } catch (error) {
    // console.error(error.detail)

    return res.status(401).json({ status: 401, message: 'checkToken error' })
  }
}

const updateToken = async (req, res) => {
  try {
    const { userId } = req.body
    const accessToken = createToken(userId, 3600)
    const refreshToken = createToken(userId, 7200)
    let date = new Date(Date.now() + 86400e3)
    date = date.toUTCString()

    await writeTokenInDB(userId, accessToken, refreshToken)

    return res
      .status(200)
      .send({
        token: `token_access=${accessToken}; token_refresh=${refreshToken}; expires=${date}`
      })
  } catch (error) {
    return res.status(400).json({ status: 400, message: 'error update token' })
  }
}

const pizzaList = async (req, res) => {
    try {
      const queryString = 'SELECT * FROM pizza'
      const result = await pool.query(queryString)
  
      res.json(result.rows)
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error'
      })
    }
  }

module.exports = {
    createNewUser,
    checkEmail,
    login,
    checkToken,
    updateToken,
    pizzaList
}