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
    const { minValue, maxValue, sortValue, hot, veg, paginationPage } = req.body 

    if (sortValue !== 'pizza_price ASC' && sortValue !== 'pizza_price DESC' && sortValue !== 'pizza_rating DESC') {
      throw new Error('sorting data error')
    }

    let filterQuery = `SELECT * FROM pizza WHERE pizza_price >= $1 AND pizza_price <= $2 ORDER BY ${sortValue} LIMIT 8 OFFSET $3`

    if (hot) {
      filterQuery = `SELECT * FROM pizza WHERE pizza_price >= $1 AND pizza_price <= $2 AND pizza_hot = true ORDER BY ${sortValue} LIMIT 8 OFFSET $3`
    }

    if (veg) {
      filterQuery = `SELECT * FROM pizza WHERE pizza_price >= $1 AND pizza_price <= $2 AND pizza_vegetarian = true ORDER BY ${sortValue} LIMIT 8 OFFSET $3`
    }

    const values = [minValue, maxValue, (paginationPage * 8 - 8)]
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
    const { minValue, maxValue, hot, veg } = req.body 
    let filterQuery = `SELECT COUNT(*) FROM pizza WHERE pizza_price >= $1 AND pizza_price <= $2`

    if (hot) {
      filterQuery = `SELECT COUNT(*) FROM pizza WHERE pizza_price >= $1 AND pizza_price <= $2 AND pizza_hot = true`
    }

    if (veg) {
      filterQuery = `SELECT COUNT(*) FROM pizza WHERE pizza_price >= $1 AND pizza_price <= $2 AND pizza_vegetarian = true`
    }

    const values = [minValue, maxValue]
    const result = await pool.query(filterQuery, values)

    res.status(200).json(result.rows[0])
  } catch (error) {
    logger.error(`currentPizzaCount: ${error}`)

    return res.status(400).json({
      message: 'currentPizzaCount error'
    })
  }
}

const createPizzaOrder = async (req, res) => {
  try {
    const { 
      orderPhone,
      orderAddress,
      userId,
      totalPrice,
      orderDate,
      basketList
     } = req.body.orderData

    const queryOrder = `INSERT INTO orders (order_phone, order_address, order_user_id, order_price, order_date) VALUES ($1, $2, $3, $4, $5) RETURNING order_id`
    const orderValues = [ orderPhone, orderAddress, userId, totalPrice, orderDate ]
    const orderResult = await pool.query(queryOrder, orderValues)

    if (await orderResult.rows[0].order_id) {
      basketList.forEach(async (e, i) => {
        const queryComposition = `INSERT INTO composition (composition_order, composition_pizza_name, composition_pizza_count, composition_pizza_price, composition_pizza_dough, composition_pizza_size) 
          VALUES ($1, $2, $3, $4, $5, $6)`
        const compositionValues = [
          orderResult.rows[0].order_id, 
          basketList[i].pizza_name, 
          basketList[i].pizza_count, 
          basketList[i].pizza_price, 
          basketList[i].pizza_dough,
          basketList[i].pizza_size
        ]
        await pool.query(queryComposition, compositionValues)
      })
    }

    return res.status(200).json({ 
      status: 200, 
      message: 'order created' 
    })

  } catch (error) {
    logger.error(`pizzaOrder: ${error}`)

    return res.status(400).json({
      status: 400, 
      message: 'pizzaOrder error'
    })
  }
}

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body
    const ordersQuery = `SELECT * FROM orders WHERE order_user_id = $1`
    const ordersValues = [userId]
    const ordersResult = await pool.query(ordersQuery, ordersValues)

    return res.status(200).json({
      message: ordersResult.rows
    })    
  } catch (error) {
    logger.error(`getUserOrders: ${error}`)

    return res.status(400).json({
      message: []
    })
  }
}

const getOrderComposition = async (req, res) => {
  try {
    const { composition_order } = req.body
    const compositionQuery = `SELECT * FROM composition WHERE composition_order = $1`
    const compositionValues = [composition_order]
    const compositionResult = await pool.query(compositionQuery, compositionValues)

    return res.status(200).json({
      message: compositionResult.rows
    })    
  } catch (error) {
    logger.error(`getOrderComposition: ${error}`)

    return res.status(400).json({
      message: []
    })
  }
}

module.exports = {
    pizzaList,
    filteredPizzaList,
    getMinMaxPrice,
    currentPizzaCount,
    createPizzaOrder,
    getUserOrders,
    getOrderComposition
}