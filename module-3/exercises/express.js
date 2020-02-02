const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');

const app = express();

const movies = [];

fs.createReadStream(`${process.cwd()}/module-3/exercises/assets/movies.csv`)
  .pipe(csv())
  .on('data', (row) => {
    movies.push(row);
  });

app.get('/movies/:id', async (req, res, next) => {
  const { id } = req.params;
  return res.sendFile(`${process.cwd()}/module-3/exercises/views/${id}.html`);
});

app.get('/api/movies/:id', async (req, res, next) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.rank === id);
  return res.json(movie);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('server start at port', PORT);
});
