const server = require('express')();
const bodyParser = require('body-parser');

const routes = require('./routes');

server.use(bodyParser.json());
server.use(routes.router);

server.listen(process.env.PORT || 3000, () => {
  console.log('server is started');
});
