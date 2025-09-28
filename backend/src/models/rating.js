module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    storeId: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }
  }, {
    tableName: 'ratings',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['userId', 'storeId'] } // user can have only one rating per store
    ]
  });

  return Rating;
};
