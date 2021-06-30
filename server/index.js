const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const apiRouter = require('./routes/api-routes')

const con = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
})

app.use([cors(), express.urlencoded({ extended: false }), express.json()])
app.use('/api', apiRouter)

app.get('/', (req, res) => {
  con.query('SELECT * FROM drinks', (err, result) => {
    if (err) throw err
    res.status(200).json({ success: true, data: result })
  })
})

app.all('*', (req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
