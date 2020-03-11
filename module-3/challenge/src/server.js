const express = require('express');
const imdb_movies = require('../imdb-movies');

const app = express();

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get('/v1/movie', async (req, res) => {
  const randomID = getRandomNumber(imdb_movies.length);
  const movie = imdb_movies.find((movie) => movie.Rank === randomID);
  res.status(200).json({ director: movie.Director, movie: movie.Title });
});

app.get('/v1/movie/:director', async (req, res) => {
  const { director } = req.params;
  const directorMovies = imdb_movies.filter(
    (movie) => movie.Director == director
  );
  const randomID = getRandomNumber(directorMovies.length);
  const movie = directorMovies[randomID];
  res.status(200).json({ director: movie.Director, movie: movie.Title });
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
