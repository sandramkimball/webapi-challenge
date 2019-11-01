const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const actionRouter = require('./routers/actionRouter.js');
const projectRouter = require('./routers/projectRouter.js');

const projects = require('./data/helpers/projectModel.js');
const server = express();


//FUNCTIONS
function logger(req, res, next){
    console.log(`${new Date().toISOString}`);
    next();
  }  

//GLOBAL MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(logger);


//LOCAL
server.use('./api/projects', projectRouter);
server.use('./api/actions', actionRouter);

// server.get('/', (req, res)=> {
//     projects.get()
//     .then(data=>{
//         res.status(200).json(data)
//     })
//     .catch (err => {
//         console.error('Error: ', err);
//         res.status(500).json({ err: 'Cannot retrieve project data' });
//       });
// })

module.exports = server;
