const express = require('express')
const app = express()
const db = require('./db');
const passport = require('./auth');


require('dotenv').config();

const bodyParser =  require('body-parser');
app.use(bodyParser.json()); //req.body

const PORT = process.env.PORT || 3000

//Middleware function

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next(); //Move on the next phase
}

app.use(logRequest) 

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/', localAuthMiddleware , function (req, res) {
  res.send('Welcome to my hotel...')
})

const personRoutes = require('./routes/personRoutes');
const Person = require('./routes/Person');

app.use('/person', localAuthMiddleware, personRoutes);

app.listen(PORT, ()=> console.log("Server is running"))