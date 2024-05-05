const express = require('express');
const router = express.Router();
const plateController = require('../controllers/plates');

// path
router.get('/plates', plateController.getAllLicensePlates);

router.post('/add-plates', plateController.addLicensePlate);

router.get('/edit-plates/:id', plateController.getEditLicensePlate);

router.post('/edit-plates', plateController.editLicensePlate);

router.get('/delete-plates', plateController.deleteLicensePlate);

module.exports = router;