const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const apiRouter = require('./routes/api-routes')

app.use([cors(), express.urlencoded({ extended: false }), express.json()])
app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.status(200).send('Hello from the server')
})

app.all('*', (req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
