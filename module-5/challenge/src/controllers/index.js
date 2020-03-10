const { NODE_ENV } = process.env;
const table = `students_${NODE_ENV}`;

const {
  insertFormatter,
  queryHelper,
  updateFormatter
} = require('../../db/helper');

const getAll = async (request, response) => {
  const query = `SELECT * FROM ${table};`;
  const students = await queryHelper(query);
  return response.status(200).json(students);
};

const getById = async (request, response) => {
  const { studentId } = request.params;
  const query = `
    SELECT * 
    FROM ${table}
    WHERE id = ${studentId}
  ;`;
  const student = await queryHelper(query);
  return response.status(200).json(student);
};

const create = async (request, response) => {
  const values = insertFormatter(request.body);
  const query = `
    INSERT INTO ${table} (${values.columns})
    VALUES (${values.values})
  ;`;

  await queryHelper(query);
  return response
    .status(201)
    .json({ success: 'A new record has been created.' });
};

const updateById = async (request, response) => {
  const { studentId } = request.params;
  const values = updateFormatter(request.body);
  const query = `
    UPDATE ${table}
    SET ${values}
    WHERE id = ${studentId}
  ;`;

  await queryHelper(query);
  return response.status(200).json({ success: 'The record has been updated.' });
};

const deleteById = async (request, response) => {
  const { studentId } = request.params;
  const query = `
    DELETE FROM ${table}
    WHERE id = ${studentId}
  ;`;

  await queryHelper(query);
  return response.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
