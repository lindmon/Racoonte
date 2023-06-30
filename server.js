const express = require('express');
require('dotenv').config({path:'./config/.env'});
require('./config/db');
const app = express();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})