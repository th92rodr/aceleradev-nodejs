const model = require('../models')['teachers'];

let Teachers = {};

Teachers.getAll = async (req, res, next) => {
  const data = await model.findAll({});

  res.status(200).json({
    total: data.length,
    data
  });
};

Teachers.getById = async (req, res, next) => {
  const { teacherId } = req.params;
  const data = await model.findOne({
    where: { id: teacherId }
  });

  res.status(200).json(data);
};

Teachers.create = async (req, res, next) => {
  const result = await model.create(req.body);

  res.status(201).json({ result });
};

Teachers.update = async (req, res, next) => {
  const { teacherId } = req.params;
  const result = await model.update(req.body, {
    where: { id: teacherId }
  });

  res.status(200).json({ result });
};

Teachers.delete = async (req, res, next) => {
  const { teacherId } = req.params;
  const result = await model.destroy({
    where: { id: teacherId }
  });

  res.status(204).json({ result });
};

module.exports = Teachers;
