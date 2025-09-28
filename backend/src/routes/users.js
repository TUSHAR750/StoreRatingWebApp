// backend/src/routes/users.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/create', auth('admin'), adminController.createUser);
router.get('/', auth('admin'), adminController.listUsers);
router.get('/dashboard', auth('admin'), adminController.adminDashboard);
router.get('/:id', auth('admin'), adminController.getUserDetails);

module.exports = router;
