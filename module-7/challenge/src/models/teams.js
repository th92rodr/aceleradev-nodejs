module.exports = (sequelize, DataTypes) =>
  sequelize.define('teams', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    coach: DataTypes.STRING,
    shieldUrl: DataTypes.STRING,
    birthYear: DataTypes.INTEGER
  });
