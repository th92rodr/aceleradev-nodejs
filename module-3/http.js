const fs = require('fs');
const http = require('http');
const PORT = 3000

const server = http.createServer((req, res) => {
  const url = req.url.split('/');
  if (url[1] == 'movies') {
    res.write(fs.readFileSync(`../exercicios/views/${url[2]}.html`));
  } else {
    res.write('hello world');
  }
  res.end();
});

server.listen(PORT, () => {
  console.log('server start at port', PORT);
});
