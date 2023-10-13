const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path:'./config/.env'});
require('./config/db');
const app = express();
const {checkUser,requireAuth} = require('./middleware/auth.middleware');
//Allow to parse the body of request
app.use(express.json());
app.use(cookieParser());

//Using authantification for each route
app.get('*',checkUser);
app.get('/jwtid', requireAuth, (req,res) => {
    res.status(200).send(res.locals.user.id)
});

//Initialize the routes
app.use('/api/user', userRoutes);


//Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})