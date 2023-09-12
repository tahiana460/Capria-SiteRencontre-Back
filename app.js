//var createError = require("http-errors");
const express = require('express')
var path = require("path");
var cors = require("cors");
const bodyParser = require('body-parser');
const socket = require('socket.io');
const fs=require('fs')
const events=require('events')

const app = express()
const port =  3100

const { pool } = require('./database');
const loginRouter=require('./routes/login');
const listUsersRouter=require('./routes/users-list');
const userRouter=require('./routes/users');
const updateUserRouter=require('./routes/user-update');
const vuesRouter=require('./routes/vues');
const chatRouter=require('./routes/chat');
const viewRouter=require('./routes/views');
const subscriptionRouter=require('./routes/subscriptions');
const uploadRouter=require('./routes/upload');
const  {socketConnection}  =require('./services/chat')

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
// app.use('/fongany',(req, res) => {
//   res.send('Aona pr amzay ary')
// });
app.use("/userList", listUsersRouter);
app.use("/update-user", updateUserRouter);
app.use("/vues", vuesRouter);
app.use("/messages", chatRouter);
app.use("/views", viewRouter);
app.use("/subscription", subscriptionRouter);
app.use("/upload", uploadRouter);

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

socketConnection(io);
io.on('connection',  socket => {
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
      data.date_debut=data.date_debut

      //let data = req.body;

      //const [result] = await pool.query(`select count(*) as nb from messages where sender_id=? and send_time>=?`, [data.sender_id, data.date_debut])
      pool.query(`select count(*) as nb from messages where sender_id=? and send_time>=? AND receiver_id!=5`, [data.sender_id, data.date_debut])
        .then(([result])=>{
          const nbMsg=result[0].nb
          const limitMsg=5
          //console.log(nbMsg)
          //console.log(limitMsg)
          //console.log(nbMsg>=limitMsg)
          if(nbMsg<limitMsg-1){
            var requete='insert into messages(sender_id,receiver_id,message) values('+data.sender_id+','+
            data.receiver_id+',"'+data.message+'")'
            connection.query(requete, (err, rows, fields) => {
              if (err) throw err
              // console.log(requete)
            })
            connection.end()
          }else if(nbMsg==limitMsg-1){
            var requete='insert into messages(sender_id,receiver_id,message) values('+data.sender_id+','+
            data.receiver_id+',"'+data.message+'")'
            connection.query(requete, (err, rows, fields) => {
              if (err) throw err
              // console.log(requete)
            })
            connection.end()
            data.limite='limite atteinte'
          }else{
            data.erreur='limite message envoye'
          } 
          io.emit('SERVER_MSG', data);
        })
  });

   // 1 online
  socket.on('client_connect', async (userId) => {
      await pool.query("UPDATE user SET statut=1 WHERE id=?", [userId])
      // console.log(userId);
  });

   // 0 offline
  socket.on('client_disconnect', async (userId) => {
      await pool.query("UPDATE user SET statut=0 WHERE id=?", [userId])
      // console.log('eh iza iny',userId);
  });
});
app.use(express.static(__dirname + '/public'));


module.exports = app;