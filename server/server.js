const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const pizza = require('./routes/pizza')
const auth = require('./routes/auth.js')
const { logger } = require('./utils/log')
const fileUpload = require('express-fileupload')
const { tokenExistInDB, tokenInfo } = require('./controllers/jwtToken.js')
const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
  })

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/images', express.static(__dirname + '/images'))

app.listen(port, () => {
  logger.info(`Server has been started on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Server has been started!')
})

app.post('/create-new-user', auth.createNewUser)
app.post('/check-email', auth.checkEmail)
app.post('/login-user', auth.login)
app.post('/check-token', auth.checkToken)
app.post('/update-token', auth.updateToken)
app.get('/pizza-list', pizza.pizzaList)
app.post('/filtered-pizza-list', pizza.filteredPizzaList)
app.get('/get-min-max-price', pizza.getMinMaxPrice)
app.post('/current-pizza-count', pizza.currentPizzaCount)
app.post('/create-pizza-order', pizza.createPizzaOrder)
app.post('/get-user-orders', pizza.getUserOrders)
app.post('/get-order-composition', pizza.getOrderComposition)
app.post('/create-new-pizza', auth.checkAdminToken, pizza.createNewPizza)
app.post('/get-pizza-name', pizza.getPizzaDataById)
app.post('/change-pizza-text', auth.checkAdminToken, pizza.changePizzaText)
app.post('/change-pizza-text-and-image', auth.checkAdminToken, pizza.changePizzaTextAndImage)
app.delete('/delete-pizza', auth.checkAdminToken, pizza.deletePizza)