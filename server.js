const express = require('express'); 
const helmet = require('helmet'); 
const server = express(); 

// Import Routers 
const dishesRouter = require('./dishes/dishes-router.js'); 
const recipesRouter = require('./recipes/recipes-router.js'); 

// Config Middleware 
server.use(helmet()); 
server.use(express.json()); 

// Use Routers 
server.use('/api/dishes', dishesRouter); 
server.use('/api/recipes', recipesRouter); 

// Server Test. Hello Msg. 
server.get('/', (req, res) => { 
    res.send({ message: 'Hello from Patty. Be Week2-Day4 Project'})
}); 

module.exports = server; 