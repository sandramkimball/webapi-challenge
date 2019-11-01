rewuire('dotenv').congig();

const server = require('./server.js');

const port = process.env.PORT || 4001

console.log('Current Port', port);

server.listen(port, ()=> {
    console.log(`Port ${port} ready for action.`)  
})

server.get('/', (req, res)=> {
    res.status(200).json({message: process.env.MSG})
})


