const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const heroData = require('../hero_server/data/heroes');

server.get('/api/heroes', (req, res, next) => {
    res.status(200).send(heroData.getHeroes);
});

server.listen(3000, () => {
    console.log('Heroes server listening on port 3000');
});