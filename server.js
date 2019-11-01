const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const server = express();


//GLOBAL MIDDLEWARE
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));


//LOCAL
server.use('./api/projects', projectRouter);
server.use('./api/actions', actionRouter);

server.get('/', (req, res)=> {
    res.send('<p>Finally, a worthy opponent.<p>')
})

module.exports.server;
