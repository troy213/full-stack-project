const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const axios = require('axios')
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

app.get('/ongkir', (req, res) => {
  axios
    .get('https://api.rajaongkir.com/starter/province', {
      headers: {
        key: process.env.apikey,
      },
    })
    .then((response) => {
      if (
        response.data.rajaongkir.status.code >= 200 &&
        response.data.rajaongkir.status.code <= 299
      ) {
        return response.data.rajaongkir.results
      } else {
        return res.status(400).json({ success: false, message: 'bad request' })
      }
    })
    .then((data) => res.status(200).json({ success: true, data: data }))
    .catch((err) => res.status(400).json({ success: false, data: err }))
})

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
