const { dirname } = require('path')
const serverPath = dirname(require.main.filename)
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

const createNewPizza = async (req, res) => {
  try {
    const {name, price, ingredients, dough, size, hot, vegetarian, meat, mix} = JSON.parse(req.body.data)
    const image = req.files.pizzaImage
    const uploadPath = serverPath + '/images/' + image.name
    const imageName = image.name.replace(/\.(jpg|png|jpeg)$/gi, '')

    image.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'createNewPizza error' })
      }
    })

    const queryInsertPizza = `INSERT INTO pizza (pizza_id, pizza_name, pizza_image_name, pizza_price, pizza_ingredients, 
      pizza_size, pizza_dough, pizza_hot, pizza_meat, pizza_vegetarian, pizza_mix, pizza_rating) 
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 0)`
    const insertValues = [ name, imageName, price, ingredients, size, dough, hot, meat, vegetarian, mix ]
    await pool.query(queryInsertPizza, insertValues)

    return res.status(200).json({ message: 'added new pizza' })
  } catch (error) {
    logger.error(`createNewPizza: ${error}`)

    return res.status(400).json({
      message: 'createNewPizza error'
    })
  }
}

const getPizzaDataById = async (req, res) => {
  try {
    const { id } = req.body

    const pizzaQuery = `SELECT * FROM pizza WHERE pizza_id = $1`
    const pizzaValues = [id]
    const pizzaResult = await pool.query(pizzaQuery, pizzaValues)

    return res.status(200).json({
      message: pizzaResult.rows[0]
    })
  } catch (error) {
    logger.error(`getPizzaById: ${error}`)

    return res.status(400).json({
      message: 'getPizzaById error'
    })
  }
}

const changePizzaText = async (req, res) => {
  try {
    const {id, name, imageName, price, ingredients, size, dough, hot, meat, vegetarian, mix} = req.body
    const queryChangePizzaText = `UPDATE pizza SET 
    pizza_name = $2, pizza_image_name = $3, pizza_price = $4, pizza_ingredients = $5, pizza_size = $6, pizza_dough = $7, 
    pizza_hot = $8, pizza_meat = $9, pizza_vegetarian = $10, pizza_mix = $11
    WHERE pizza_id = $1`
    const insertValues = [ id, name, imageName, price, ingredients, size, dough, hot, meat, vegetarian, mix ]
    
    await pool.query(queryChangePizzaText, insertValues)

    return res.status(200).json({ status: true, message: `change text in pizza by id: ${id}` })

  } catch (error) {
    logger.error(`changePizzaText: ${error}`)

    return res.status(400).json({
      status: false, message: 'changePizzaText error'
    })
  }
}

const changePizzaTextAndImage = async (req, res) => {
  try {
    const {id, name, imageName, price, ingredients, size, dough, hot, meat, vegetarian, mix} = JSON.parse(req.body.data)
    const imageNameWithoutExtention = imageName.replace(/\.(jpg|png|jpeg)$/gi, '')

    if (!req.files.pizzaImage) {
      return res.status(400).json({ status: false, message: `changePizzaTextAndImage error` })
    } 

    const image = req.files.pizzaImage
    const uploadPath = serverPath + '/images/' + image.name

    image.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({ status: false, message: 'changePizzaTextAndImage error' })
      }
    })

    const updateQuery = `UPDATE pizza SET 
    pizza_name = $2, pizza_image_name = $3, pizza_price = $4, pizza_ingredients = $5, pizza_size = $6, pizza_dough = $7, 
    pizza_hot = $8, pizza_meat = $9, pizza_vegetarian = $10, pizza_mix = $11
    WHERE pizza_id = $1`
    const insertValues = [ id, name, imageNameWithoutExtention, price, ingredients, size, dough, hot, meat, vegetarian, mix ]
    await pool.query(updateQuery, insertValues)

    return res.status(200).json({ status: true, message: `change pizza id: ${id}` })

  } catch (error) {
    logger.error(`changePizzaTextAndImage: ${error}`)

    return res.status(400).json({
      status: false, message: 'changePizzaTextAndImage error'
    })
  }
}

const deletePizza = async (req, res) => {
  try {
    const { id } = req.body

    const deleteQuery = `DELETE FROM pizza WHERE pizza_id = $1`
    const insertValues = [ id ]

    await pool.query(deleteQuery, insertValues)

    return res.status(200).json({ status: true, message: `pizza id ${id} deleted` })
  } catch (error) {
    logger.error(`deletePizza: ${error}`)

    return res.status(400).json({
      status: false,
      message: 'deletePizza error'
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
    getOrderComposition,
    createNewPizza,
    getPizzaDataById,
    changePizzaText,
    changePizzaTextAndImage,
    deletePizza
}