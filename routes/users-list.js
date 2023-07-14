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
    var id_user=data.id
    var requete='SELECT * from user where id!='+id_user
    connection.query(requete, (err, rows, fields) => {
        if (err) throw err
      
        //console.log( rows)
        /* GET users listing. */
        res.send(rows)
        //reponse=rows[0].solution
        
    })
})



module.exports = router;
