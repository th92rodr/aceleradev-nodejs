const model = require('../models')['players'];
const { Op } = require('sequelize');

let Players = {};

Players.getAll = async (req, res, next) => {
  const { nationality, score } = req.query;
  let data;
  if (nationality != undefined) {
    data = await model.findAll({
      where: { nationality: nationality }
    });
  } else if (score != undefined) {
    data = await model.findAll({
      where: {
        score: {
          [Op.gt]: score
        }
      }
    });
  } else {
    data = await model.findAll({});
  }
  res.status(200).json({
    total: data.length,
    data
  });
};

Players.getById = async (req, res, next) => {
  const { playerId } = req.params;
  const data = await model.findOne({
    where: { id: playerId }
  });
  res.status(200).json(data);
};

Players.create = async (req, res, next) => {
  const result = await model.create(req.body);
  res.status(201).json(result);
};

Players.update = async (req, res, next) => {
  const { playerId } = req.params;
  const result = await model.update(req.body, {
    where: { id: playerId }
  });
  res.status(200).json({ result });
};

Players.delete = async (req, res, next) => {
  const { playerId } = req.params;
  await model.destroy({
    where: { id: playerId }
  });
  res.status(204);
};

module.exports = Players;
