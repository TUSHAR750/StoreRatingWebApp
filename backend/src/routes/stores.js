// backend/src/routes/stores.js
const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const auth = require('../middleware/auth');

router.get('/', auth(), storeController.listStores);
router.get('/:id', auth(), storeController.getStore);

router.post('/', auth('admin'), storeController.createStore);

router.get('/:id/ratings', auth('storeowner'), storeController.getRatingsForStore);

module.exports = router;
