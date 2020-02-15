module.exports = (sequelize, DataTypes) =>
  sequelize.define('teachers', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialty: DataTypes.STRING,
    hiring_date: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  });
