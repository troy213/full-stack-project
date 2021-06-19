const express = require('express')
const router = express.Router()

const {
  getApi,
  getApiId,
  postApi,
  putApi,
  delApi,
} = require('../controllers/api-controller')

router.get('/', getApi)
router.get('/:id', getApiId)
router.post('/', postApi)
router.put('/:id', putApi)
router.delete('/:id', delApi)

module.exports = router
