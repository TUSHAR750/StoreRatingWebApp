const express = require('express');
const router = express.Router();
const { Rating } = require('../models');
const auth = require('../middleware/auth');


router.get('/my', auth(), async (req, res) => {
  try {
    const ratings = await Rating.findAll({ where: { userId: req.user.id } });
    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/:storeId/rate', auth(), async (req, res) => {
  try {
    const { storeId } = req.params;
    const { value } = req.body;

    let rating = await Rating.findOne({ where: { userId: req.user.id, storeId } });
    if (rating) {
      rating.value = value;
      await rating.save();
    } else {
      rating = await Rating.create({ userId: req.user.id, storeId, value });
    }

    res.json(rating);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
