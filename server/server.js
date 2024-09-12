const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const controller = require('./controllers/index')

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Server has been started!')
})

app.post('/create-new-user', controller.createNewUser)
app.post('/check-email', controller.checkEmail)
app.get('/pizza', controller.pizza)