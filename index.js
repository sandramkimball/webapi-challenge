require('dotenv').config();

const server = require('./server.js');

const port = process.env.PORT || 4001;

console.log('Current in Port', port);


server.get('/', (req, res)=> {
    res.status(200).json({message: 'Ahoy!'})
})

server.listen(port, ()=> {
    console.log(`Port ${port} ready to set sail.`)  
})



