const express = require('express');
const { getParkingSpots, addParkingSpots, getParking } = require('../controller/parking');
const router = express.Router();




router.route('/').get(getParking);
router.route('/spots').get(getParkingSpots);
router.route('/spots').post(addParkingSpots);

// router.route('/static').get(getAllProductsStatic)

module.exports = router