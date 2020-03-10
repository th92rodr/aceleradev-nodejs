const teamsModel = require('../models')['teams'];
const playersModel = require('../models')['players'];

let Teams = {};

Teams.getAll = async (req, res, next) => {
  const data = await teamsModel.findAll({});
  res.status(200).json({
    total: data.length,
    data
  });
};

Teams.getById = async (req, res, next) => {
  const { teamId } = req.params;
  const data = await teamsModel.findOne({
    where: { id: teamId },
    include: playersModel
  });
  res.status(200).json(data);
};

Teams.getTeamPlayers = async (req, res, next) => {
  const { teamId } = req.params;
  const data = await teamsModel.findAll({
    where: { id: teamId },
    include: playersModel
  });
  const resObj = data.map((team) => {
    return Object.assign(
      {},
      {
        players: team.players.map((player) => {
          return Object.assign(
            {},
            {
              name: player.name,
              nickname: player.nickname,
              nationality: player.nationality,
              age: player.age,
              wage: player.wage,
              score: player.score,
              teamId: team.id
            }
          );
        })
      }
    );
  });
  res.status(200).json({
    total: resObj[0].players.length,
    data: resObj[0].players
  });
};

Teams.create = async (req, res, next) => {
  const result = await teamsModel.create(req.body);
  res.status(201).json(result);
};

Teams.update = async (req, res, next) => {
  const { teamId } = req.params;
  const result = await teamsModel.update(req.body, {
    where: { id: teamId }
  });
  res.status(200).json({ result });
};

Teams.delete = async (req, res, next) => {
  const { teamId } = req.params;
  await teamsModel.destroy({
    where: { id: teamId }
  });
  res.status(204);
};

module.exports = Teams;
