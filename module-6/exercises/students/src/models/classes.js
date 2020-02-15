module.exports = (sequelize, DataTypes) =>
  sequelize.define('classes', {
    date: DataTypes.DATE,
    topic: DataTypes.STRING,
    teacher: DataTypes.STRING
  });
