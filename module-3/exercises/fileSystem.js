const fs = require('fs');
const csv = require('csv-parser');
const { toHTML } = require('./template');

const writeFile = (movie) => {
  const path = `${process.cwd()}/module-3/exercises/views/${movie.rank}.html`;
  const content = toHTML(movie);
  try {
    return fs.writeFileSync(path, content, 'utf8');
  } catch (error) {
    return `Couldnot create file ${movie.rank}.html`;
  }
};

function readCSV() {
  fs.createReadStream(`${process.cwd()}/module-3/exercises/assets/movies.csv`)
    .pipe(csv())
    .on('data', (row) => {
      writeFile(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

readCSV();

module.exports = { readCSV };
