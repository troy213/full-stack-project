const drinks = require('../data/drinks')

const getApi = (req, res) => {
  res.status(200).json({ success: true, data: drinks })
}

const getApiId = (req, res) => {
  const { id } = req.params
  const checkData = drinks.find((value) => value.id === Number(id))
  if (!checkData) {
    return res
      .status(404)
      .json({ success: false, message: `data with id ${id} is not available` })
  }
  res.status(200).json({ success: true, data: [checkData] })
}

const postApi = (req, res) => {
  const { name, price } = req.body
  const IdIncrement = drinks.length + 1
  if (name && price) {
    return res.status(200).json({
      success: true,
      data: [...drinks, { id: IdIncrement, name: name, price: price }],
    })
  }
  res
    .status(400)
    .json({ status: false, message: 'name and price are required!' })
}

const putApi = (req, res) => {
  const { id } = req.params
  const { name, price } = req.body
  const checkData = drinks.find((value) => value.id === Number(id))
  if (!checkData) {
    return res
      .status(404)
      .json({ success: false, message: `data with id ${id} is not available` })
  }
  if (name && price) {
    checkData.name = name
    checkData.price = price
    return res.status(200).json({ success: true, data: checkData })
  }
  res
    .status(400)
    .json({ status: false, message: 'name and price are required!' })
}

const delApi = (req, res) => {
  const { id } = req.params
  const checkData = drinks.find((value) => value.id === Number(id))
  if (!checkData) {
    return res
      .status(404)
      .json({ success: false, message: `data with id ${id} is not available` })
  }
  const data = drinks.filter((value) => value.id !== Number(id))
  res.status(200).json({ success: true, data: data })
}

module.exports = { getApi, getApiId, postApi, putApi, delApi }
