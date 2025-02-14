const express = require('express')
const app = express()
const db = require('./db');

const bodyParser =  require('body-parser');
app.use(bodyParser.json()); //req.body


app.get('/', function (req, res) {
  res.send('Welcome to my hotel...')
})


const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

app.listen(3000, ()=> console.log("Server is running"))