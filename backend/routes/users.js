const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// path
router.get('/users', userController.getAllUsers);

// router.post('/add-plates', plateController.addLicensePlate);

// router.get('/edit-plates/:id', plateController.getEditLicensePlate);

// router.post('/edit-plates', plateController.editLicensePlate);

// router.get('/delete-plates', plateController.deleteLicensePlate);

module.exports = router;