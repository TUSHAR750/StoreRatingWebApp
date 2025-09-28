const bcrypt = require('bcrypt');
const { sequelize, User, Store, Rating } = require('./models');
require('dotenv').config();

(async () => {
  try {
    await sequelize.sync({ force: true });

    const pass = await bcrypt.hash('User@123', 10);
    const adminPass = await bcrypt.hash('Admin@123', 10);
    const ownerPass = await bcrypt.hash('Owner@123', 10);

    const admin = await User.create({ name: 'System Administrator Demo User', email: 'admin@example.com', password: adminPass, address: 'Admin Address', role: 'admin' });
    const user = await User.create({ name: 'Demo Normal User Examplexxxxx', email: 'user@example.com', password: pass, address: 'User Address', role: 'user' });
    const owner = await User.create({ name: 'Demo Store Owner Examplexxxxx', email: 'owner@example.com', password: ownerPass, address: 'Owner Address', role: 'storeowner' });

    const store = await Store.create({ name: 'Corner Grocery', email: 'g@ex.com', address: 'Main st', ownerId: owner.id });

    await Rating.create({ userId: user.id, storeId: store.id, value: 4 });

    console.log('Seed done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
