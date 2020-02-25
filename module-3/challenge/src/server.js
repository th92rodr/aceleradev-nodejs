const express = require('express');
const imdb_movies = require('../imdb-movies');
const app = express();

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get('/v1/movie', async (req, res, next) => {
  const rand_id = getRandomNumber(imdb_movies.length);
  const obj = imdb_movies.find((movie) => movie.Rank === rand_id);
  res.status(200).json({ director: obj.Director, movie: obj.Title });
});

app.get('/v1/movie/:director', async (req, res, next) => {
  const { director } = req.params;
  const arr = imdb_movies.filter((movie) => movie.Director == director);
  const rand_id = getRandomNumber(arr.length);
  const obj = arr[rand_id];
  res.status(200).json({ director: obj.Director, movie: obj.Title });
});

const start = async (port = 8080) => {
  app.listen(port, function() {
    console.info('%s listening at port %s', app.name, port);
  });
};

const stop = () => {
  app.close(() => {
    console.info('App Stopped');
  });
};

module.exports = {
  app,
  start,
  stop
};
