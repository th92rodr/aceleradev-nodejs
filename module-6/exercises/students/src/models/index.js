const Sequelize = require('sequelize');
const path = require('path');

const config = require('../config');

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    ...config.db,
    dialect: 'mysql'
  }
);

const students = sequelize.import(path.join(__dirname, 'students.js'));
const teachers = sequelize.import(path.join(__dirname, 'teachers.js'));
const classes = sequelize.import(path.join(__dirname, 'classes.js'));

classes.belongsToMany(students, { through: 'classes_students' });
students.belongsToMany(classes, { through: 'classes_students' });

const db = {};

db[students.name] = students;
db[teachers.name] = teachers;
db[classes.name] = classes;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
