var express = require('express');
var router = express.Router();


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
    var requete="SELECT * FROM messages WHERE (sender_id="+mon_id+" or receiver_id="+mon_id+
    ") and (sender_id="+rec_id+" or receiver_id="+rec_id+") and message!='undefined' order by send_time"
    connection.query(requete, (err, rows, fields) => {
        if (err) throw err
      
        //console.log( rows)
        /* GET users listing. */
        res.send(rows)
        //reponse=rows[0].solution
        
    })
})



module.exports = router;
