var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const dotenv = require("dotenv")
dotenv.config()

router.post('/', (req, res) => {
    let data = req.body;
    //console.log(data);
    //console.log(data.mail);
    mail=data.mail;
    var res1=String(mail)
    .toLowerCase()
    .match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/);
    //console.log(res1);
    var erreur=[];
    if(res1!=null){
        //console.log(erreur.erreur)
        mdp=data.mdp;
        const connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        })

        connection.connect()
        requete="select * from user where mail='"+mail+"' and mdp=sha1('"+mdp+"')";
        //connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        connection.query(requete, (err, rows, fields) => {
            if (err) throw err

            //console.log( rows)
            reponse=rows;
            if(reponse.length==0){
                res.send({erreur:"Erreur d'authentification"})
            }else{
                res.send(reponse);
            }
        })
        connection.end();
    }else{
        erreur={erreur:'Mail invalide'};
        //res.send('ok erreur');
        res.send(erreur);
    }
    
})


module.exports = router;