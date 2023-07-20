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
    var requete='UPDATE user set ' 
    let changements=data.changements
    console.log(Object.keys(changements).length)
    const nbChangements=(Object.keys(changements).length)
    var j=0
    for(let i in changements){
        valeur=i+"='"+changements[i]+"'"
        if(i=='mdp'){
            valeur=i+"=SHA1('"+changements[i]+"')"
        }
        requete+=valeur
        if(j!=nbChangements-1){
            requete+=','
        }
        j+=1
    }
    requete+=" where id="+id_user 
    console.log(requete)
    connection.query(requete, (err, rows, fields) => {
        if (err) throw err
      
        //console.log( rows)
        res.send("modifier")
        //reponse=rows[0].solution
        
    })
})



module.exports = router;
