// backend/src/controllers/ratingController.js
const { Rating, User } = require('../models');


exports.getRatingsForStore = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { storeId: req.params.id },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
