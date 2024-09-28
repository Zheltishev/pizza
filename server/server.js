const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const pizza = require('./routes/pizza')
const auth = require('./routes/auth.js')
const { logger } = require('./utils/log')

app.use(cors())
app.use(express.json())
app.use('/images', express.static(__dirname + '/images'))
console.log(__dirname)

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