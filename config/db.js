const mongoose = require('mongoose');

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

mongoose
    .connect(`mongodb+srv://${user}:${password}@cluster0.qyetu4h.mongodb.net/Racoont`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err)=> console.log('Connection to MongoDB failed', err));

