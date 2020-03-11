// Implementar o esquema de Animals, seguindo o proposto no README.md
module.exports = (sequelize, DataTypes) =>
  sequelize.define('animals', {
    pet_name: DataTypes.STRING,
    description: DataTypes.STRING,
    animal_type: DataTypes.ENUM('Cão', 'Gato', 'Outros'),
    pet_age: DataTypes.INTEGER,
    pet_size: DataTypes.ENUM('Grande', 'Médio', 'Pequeno'),
    sex: DataTypes.ENUM('Macho', 'Fêmea'),
    color: DataTypes.STRING,
    image_url: DataTypes.STRING
  });
