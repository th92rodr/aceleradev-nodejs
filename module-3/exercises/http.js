const fs = require('fs');
const http = require('http');
const PORT = 3000;

const getFile = (file) => {
  const path = `${process.cwd()}/module-3/exercises/views/${file}.html`;
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (error) {
    return 'File not Found';
  }
};

const server = http.createServer((req, res) => {
  const url = req.url.split('/');
  if (url[1] == 'movies') {
    const movie_id = url[2];
    res.write(getFile(movie_id));
  } else {
    res.write('hello world');
  }
  res.end();
});

server.listen(PORT, () => {
  console.log('server start at port', PORT);
});
