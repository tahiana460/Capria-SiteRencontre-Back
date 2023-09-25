var express = require('express');
var router = express.Router();
const {getNbMsgs, getLastMessage}=require('../services/messages')


const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'site_rencontre'
})

connection.connect()
router.post('/', (req, res) => {
    let data=req.body
    //console.log(data)
    var mon_id=data.mon_id
    let rec_id=data.receiver_id
    var requete="SELECT * FROM messages WHERE ((sender_id="+mon_id+" and receiver_id="+rec_id+
    ") or (sender_id="+rec_id+" and receiver_id="+mon_id+")) and message!='undefined' order by send_time"
    connection.query(requete, (err, rows, fields) => {
        if (err) throw err
      
        // console.log( requete)
        /* GET users listing. */
        res.send(rows)
        //reponse=rows[0].solution
        
    })
})

router.post('/nbMsg',getNbMsgs)
router.get('/lastMessage/:sender_id/:receiver_id', getLastMessage)



module.exports = router;
