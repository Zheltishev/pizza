const { Pool } = require('pg')
const { logger } = require('../utils/log')
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
})

const pizzaList = async (req, res) => {
  try {
    const queryString = 'SELECT * FROM pizza ORDER BY pizza_price'
    const result = await pool.query(queryString)

    res.status(200).json(result.rows)
  } catch (error) {
    logger.error(`pizzaList: ${error}`)

    return res.status(500).json({
      message: 'pizzaList error'
    })
  }
}

const filteredPizzaList = async (req, res) => {
  try {
    const { minValue, maxValue, sortValue, paginationPage } = req.body 
    let filterQuery = `SELECT * FROM pizza WHERE pizza_price >= $1 AND pizza_price <= $2 ORDER BY ${sortValue} LIMIT 8 OFFSET ${paginationPage * 8 - 8}`
    const values = [minValue, maxValue]
    const filteredResult = await pool.query(filterQuery, values)

    return res.status(200).json({ filteredPizzaList: filteredResult.rows })
  } catch (error) {
    logger.error(`filteredPizzaList: ${error}`)

    return res.status(500).json({
      message: 'filteredPizzaList error'
    })
  }
}

const getMinMaxPrice = async (req, res) => {
  try {
    const queryString = 'SELECT MIN(pizza_price) as min, MAX(pizza_price) as max FROM pizza'
    const result = await pool.query(queryString)

    res.status(200).json(result.rows[0])
  } catch (error) {
    logger.error(`getMinMaxPrice: ${error}`)

    return res.status(400).json({
      message: 'getMinMaxPrice error'
    })
  }
}

const currentPizzaCount = async (req, res) => {
  try {
    const { minValue, maxValue, paginationPage } = req.body 
    let filterQuery = `SELECT COUNT(*) FROM pizza WHERE pizza_price >= $1 AND pizza_price <= $2 LIMIT 8 OFFSET ${paginationPage * 8 - 8}`
    const values = [minValue, maxValue]
    const result = await pool.query(filterQuery, values)

    console.log(result.rows[0])
    res.status(200).json(result.rows[0])
  } catch (error) {
    logger.error(`currentPizzaCount: ${error}`)

    return res.status(400).json({
      message: 'currentPizzaCount error'
    })
  }
}

module.exports = {
    pizzaList,
    filteredPizzaList,
    getMinMaxPrice,
    currentPizzaCount
}