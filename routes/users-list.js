var express = require('express');
var router = express.Router();

const dotenv = require("dotenv")
dotenv.config()

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

connection.connect()
router.post('/', (req, res) => {
    let data=req.body
    //console.log(data)
    var id_user=data.id
    let filtres=data.filtres
    var requete='SELECT * from user where id!='+id_user+' AND estAdmin=0'
    if(filtres.length>0){
      if(filtres[0]==1){
        if(filtres[1]!=''){
          requete+=' and sexe="'+filtres[1]+'"'
        }
        if(filtres[2]!=''){
          if(filtres[2]=='60'){
            requete+=' and TIMESTAMPDIFF( year, dateDeNaissance, now( ) ) >='+60;
          }
          else{
            requete+=' and TIMESTAMPDIFF( year, dateDeNaissance, now( ) ) >='+filtres[2]
            requete+=' and TIMESTAMPDIFF( year, dateDeNaissance, now( ) )<'+filtres[3]
          }
        }
      }else{
        if(filtres[1]!=''){
          requete+=" and (LOWER(pseudo) like LOWER('%"+filtres[1]+"%') or LOWER(nom) like LOWER('%"+filtres[1]+"%') or LOWER(prenom) like LOWER('%"+filtres[1]+"%') )"
        }
      }    
    }    
    //console.log(requete)
    /*if(filtres[1]!=''){
      if(filtres[1])
    }*/
    
    connection.query(requete, (err, rows, fields) => {
        if (err) throw err
      
        //console.log( rows)
        /* GET users listing. */
        res.send(rows)
        //reponse=rows[0].solution
        
    })
})



module.exports = router;
