var createError = require("http-errors");
const express = require('express')
var path = require("path");
var cors = require("cors");
const bodyParser = require('body-parser');
const socket = require('socket.io');

const app = express()
const port = 3100

const loginRouter=require('./routes/login');
const listUsersRouter=require('./routes/users-list');
const userRouter=require('./routes/users');
const updateUserRouter=require('./routes/user-update');
const vuesRouter=require('./routes/vues');
const chatRouter=require('./routes/chat');
const viewRouter=require('./routes/views');
const subscriptionRouter=require('./routes/subscriptions');

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
app.use('/users',userRouter);
app.use("/userList", listUsersRouter);
app.use("/update-user", updateUserRouter);
app.use("/vues", vuesRouter);
app.use("/messages", chatRouter);
app.use("/views", viewRouter);
app.use("/subscription", subscriptionRouter);

// app.use('/suppliers', suppliersRouter);

//app
const server=app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})

const io = socket(server,{
  cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["content-type"]
    }
});

io.on('connection', socket => {
  //console.log("socket=",socket.id);
  socket.on('CLIENT_MSG', data => {
      // console.log("msg=",data);
      const mysql = require('mysql')
      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'site_rencontre'
      });

      connection.connect()
      data.sender_id=parseInt(data.sender_id)
      data.receiver_id=parseInt(data.receiver_id)
      var requete="insert into messages(sender_id,receiver_id,message) values("+data.sender_id+","+
      data.receiver_id+",'"+data.message+"')"
      connection.query(requete, (err, rows, fields) => {
        if (err) throw err
        // console.log(requete)
      })
      connection.end()
      io.emit('SERVER_MSG', data);
  })
});


module.exports = app;