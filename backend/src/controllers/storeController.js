// backend/src/controllers/storeController.js
const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize'); 


exports.listStores = async (req, res) => {
  try {
    const { name, address } = req.query;

    const stores = await Store.findAll({
      where: {
        name: name ? { [Op.iLike]: `%${name}%` } : { [Op.ne]: null },
        address: address ? { [Op.iLike]: `%${address}%` } : { [Op.ne]: null }
      },
      include: [
        { model: Rating, attributes: ['value', 'userId'] }
      ]
    });

    const result = stores.map(store => {
      const ratings = store.Ratings || [];
      const avg = ratings.length ? ratings.reduce((a, r) => a + r.value, 0) / ratings.length : null;
      const userRating = ratings.find(r => r.userId === req.user.id)?.value || null;
      return { store, average: avg, userRating };
    });

    res.json({ stores: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getStore = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [{ model: Rating }]
    });
    if (!store) return res.status(404).json({ message: 'Store not found' });

    const avg = store.Ratings.length ? store.Ratings.reduce((a, r) => a + r.value, 0) / store.Ratings.length : null;
    const userRating = store.Ratings.find(r => r.userId === req.user.id)?.value || null;

    res.json({ store, average: avg, userRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.create({ name, email, address, ownerId: req.user.id });
    res.json({ message: 'Store created', store });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getRatingsForStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const ratings = await Rating.findAll({
      where: { storeId },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.json(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
