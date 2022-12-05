const express = require('express')

const BirdCtrl = require('../controller/bird-controle')

const router = express.Router()

router.get('/birdRoutes', BirdCtrl.getBirdRoutes)
router.get('/birdFilters', BirdCtrl.getBirdFilterPossibilities)
router.get('/birdYears', BirdCtrl.getYearFilterPossibilities)
router.get('/birdPaths', BirdCtrl.getBirdPaths)

module.exports = router