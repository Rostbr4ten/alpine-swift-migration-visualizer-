const express = require('express')

const BirdCtrl = require('../controller/bird-controle')

const router = express.Router()

router.get('/birdRoutes', BirdCtrl.getBirdRoutes)

module.exports = router