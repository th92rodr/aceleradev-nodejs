module.exports = (sequelize, DataTypes) =>
  sequelize.define('players', {
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    nationality: DataTypes.STRING,
    age: DataTypes.INTEGER,
    wage: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });
