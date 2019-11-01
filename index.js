require('dotenv').config();

const server = require('./server.js');

const port = process.env.PORT || 4001;

console.log('Currently in Port', port);



server.listen(port, ()=> {
    console.log(`Port ${port} ready to set sail.`)  
})

server.get('/', (req, res)=> {
    res.status(200).json({message: 'Ahoy!'})
})




