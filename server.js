const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const actionRouter = require('./routers/actionRouter.js');
const projectRouter = require('./routers/projectRouter.js');

const server = express();


//FUNCTIONS
// function logger(req, res, next){
//     console.log(`${new Date().toISOString}`);
//     next();
//   }  

//GLOBAL MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


//LOCAL
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.get('/', (req, res) => {
    res.send('<h1>Time to set Sail<h1>')
  })

module.exports = server;
