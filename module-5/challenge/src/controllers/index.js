const { NODE_ENV } = process.env
const table = `students_${NODE_ENV}`

// Deixamos esses helpers para ficar mais fácil escrever as queries e executálas de formas assíncrona. 🚀 
const { insertFormatter, queryHelper, updateFormatter } = require('../../db/helper')

const getAll = async (request, response) => {
  const query = `SELECT * FROM students_test;`;
  const students = await queryHelper(query);
  return response.status(200).json(students);
}

const getById = async (request, response) => {
  const { studentId } = request.params;
  const query = `
    SELECT * 
    FROM students_test
    WHERE id = ${studentId}
  ;`;
  const student = await queryHelper(query);
  return response.status(200).json(student);
}

const create = async (request, response) => {
  const {
    name,
    surname,
    email,
    age,
    gender,
    is_employed,
    city,
  } = request.body;
  const st_class = request.body.class;

  const query = `
    INSERT INTO students_test (name, surname, email, age, gender, is_employed, city, class)
    VALUES ('${name}', '${surname}', '${email}', '${age}', '${gender}', '${is_employed}', '${city}', '${st_class}')
  ;`;

  const student = await queryHelper(query);
  return response.status(201).json({ success: 'A new record has been created.' });
}

const updateById = async (request, response) => {
  const { studentId } = request.params;
  const {
    name,
    surname,
    email,
    age,
    gender,
    is_employed,
    city,
  } = request.body;
  const st_class = request.body.class;

  const query = `
    UPDATE students_test
    SET  
    name = '${name}',
    surname = '${surname}',
    email = '${email}',
    age = '${age}',
    gender = '${gender}',
    is_employed = '${is_employed}',
    city = '${city}',
    class = '${st_class}'
    WHERE id = ${studentId}
  ;`;

  await queryHelper(query);
  return response.status(200).json({ success: 'The record has been updated.' });
}

const deleteById = async (request, response) => {
  const { studentId } = request.params;
  const query = `
    DELETE FROM students_test
    WHERE id = ${studentId}
  ;`;

  await queryHelper(query);
  return response.status(204).end();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
