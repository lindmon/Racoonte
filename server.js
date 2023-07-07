const express = require('express');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path:'./config/.env'});
require('./config/db');
const app = express();
//Allow to parse the body of request
app.use(express.json());
//Initialize the routes
app.use('/api/user', userRoutes);


//Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})