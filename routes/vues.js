var express = require('express');
var router = express.Router();

const dotenv = require("dotenv")
dotenv.config()

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: false,
  port: 11345
})

connection.connect()
router.get('/nb/:id', (req, res) => {
    let data=req.params
    //console.log(data)
    var id_user=data.id
    var requete='SELECT count(*) as nb from vues where visited_id='+id_user 
    connection.query(requete, (err, rows, fields) => {
        if (err) throw err
        console.log( rows)
        /* GET users listing. */
        res.send(rows)
        //reponse=rows[0].solution
        
    })
});

router.get('/:id', (req, res) => {
    let data=req.params
    //console.log(data)
    var id_user=data.id
    var requete='select user.* from user join vues on user.id=vues.visitor_id where vues.visited_id='+id_user 
    connection.query(requete, (err, rows, fields) => {
        if (err) throw err
        //console.log(rows)
        //console.log( rows)
        /* GET users listing. */
        res.send(rows)
        //reponse=rows[0].solution
        
    })
})



module.exports = router;
