// backend/src/routes/stores.js
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const auth = require('../middleware/auth');

// Public store listing (with user rating)
router.get('/', auth(), storeController.listStores);
router.get('/:id', auth(), storeController.getStore);

// Admin store creation
router.post('/', auth('admin'), storeController.createStore);

// Store owner: view ratings
router.get('/:id/ratings', auth('storeowner'), storeController.getRatingsForStore);

module.exports = router;
