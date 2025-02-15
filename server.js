const express = require('express')
const app = express()
const db = require('./db');

require('dotenv').config();

const bodyParser =  require('body-parser');
app.use(bodyParser.json()); //req.body

const PORT = process.env.PORT || 3000



app.get('/', function (req, res) {
  res.send('Welcome to my hotel...')
})


const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);



app.listen(PORT, ()=> console.log("Server is running"))