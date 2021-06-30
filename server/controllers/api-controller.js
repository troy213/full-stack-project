const mysql = require('mysql')
require('dotenv').config

const db = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
})

const getApi = (req, res) => {
  const sql = 'SELECT * FROM drinks'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('getApi connected to DB')
    return res.status(200).json({ success: true, data: result })
  })
}

const getApiId = (req, res) => {
  const { id } = req.params
  const sql = 'SELECT * FROM drinks WHERE id = ?'
  db.query(sql, id, (err, result) => {
    if (err) throw err
    console.log('getApiId connected to DB')
    if (result.length > 0) {
      return res.status(200).json({ success: true, data: result })
    }
    res
      .status(404)
      .json({ success: false, message: `data with id ${id} is not available` })
  })
}

const postApi = (req, res) => {
  const { name, price, img } = req.body
  const sql = 'INSERT INTO drinks (name, price, img) VALUES (?,?,?)'
  if (name && price && img) {
    db.query(sql, [name, price, img], (err, result) => {
      if (err) throw err
      console.log('postApi connected to DB')
      return res.status(200).json({ success: true, data: result })
    })
  }
}

const putApi = (req, res) => {
  const { id, name, price, img } = req.body
  console.log(id, name, price, img)
  const sql = 'UPDATE drinks SET name = ?, price = ?, img = ? WHERE id = ?'
  if (name && price && img) {
    db.query(sql, [name, price, img, id], (err, result) => {
      if (err) throw err
      console.log('putApi connected to DB')
      return res.status(200).json({ success: true, data: result })
    })
  }
}

const delApi = (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM drinks WHERE id = ?'
  db.query(sql, id, (err, result) => {
    if (err) throw err
    console.log('delApi connected to DB')
    return res.status(200).json({ success: true, data: result })
  })
}

module.exports = { getApi, getApiId, postApi, putApi, delApi }
