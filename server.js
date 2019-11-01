const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const projects = require('./data/helpers/projectModel.js');

const server = express();

const actionRouter = require('./data/routers/actionRouter.js');
const projectRouter = require('./data/routers/projectRouter.js');


//GLOBAL MIDDLEWARE
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));


//LOCAL
server.use('./api/projects', projectRouter);
server.use('./api/actions', actionRouter);

server.get('/', (req, res)=> {
    projects.get()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch (err => {
        console.error('Error: ', err);
        res.status(500).json({ err: 'Cannot retrieve project data' });
      });
})

module.exports = server;
