const fs = require('fs');
const csv = require('csv-parser');
const { toHTML } = require('./template');

fs.createReadStream('./assets/movies.csv')
  .pipe(csv())
  .on('data', (row) => {
    //console.log(row);
    fs.writeFileSync(`./views/${row.rank}.html`, toHTML(row));
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
