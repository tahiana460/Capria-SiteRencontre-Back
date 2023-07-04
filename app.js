const express = require('express')
const app = express()
const port = 3100

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

// app.use('/suppliers', suppliersRouter);

//app
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})