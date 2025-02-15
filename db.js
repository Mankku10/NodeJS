const mongoose = require('mongoose');

require('dotenv').config();


// const mongoURL = process.env.DB_LOCAL_URL

const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to MongoDB server...')
});

db.on('error',()=>{
    console.log('MongoDB connection error', error)
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected...')
});

module.exports = db;
