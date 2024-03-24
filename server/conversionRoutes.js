const express = require('express');
const conversionController = require('./conversionController');
const router = express.Router()

// add conversion
router.post('/add', conversionController.add);

// delete conversion
router.delete('/delete', conversionController.delete);

// get conversions
router.get('/conversions', conversionController.conversions);



module.exports = router