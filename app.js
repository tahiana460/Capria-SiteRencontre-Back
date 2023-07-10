var createError = require("http-errors");
const express = require('express')
var path = require("path");
var cors = require("cors");
const bodyParser = require('body-parser');

const app = express()
const port = 3100

const loginRouter=require('./routes/login');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const suppliersRouter = require("./routes/suppliers")

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes config
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/login',loginRouter);

// app.use('/suppliers', suppliersRouter);

//app
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})

module.exports = app;