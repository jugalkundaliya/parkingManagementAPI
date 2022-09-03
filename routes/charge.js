const express = require('express');
const { getCharges, addCharges } = require('../controller/charge');
const router = express.Router();




router.route('/').get(getCharges);
router.route('/').post(addCharges);


module.exports = router