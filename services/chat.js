const { pool } = require('../database');

const socketConnection = (io) => {
    io.on("connection", socket => {
        socket.on('CLIENT_MSG', data => {
            // console.log("msg=",data);
            /*const mysql = require('mysql')
            const connection = mysql.createConnection({
              host: 'localhost',
              user: 'root',
              password: 'root',
              database: 'site_rencontre',
              charset : 'utf8mb4',
              collation: 'utf8mb4_unicode_ci' 
            });
      
            connection.connect()*/
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
                /*pool.query('SHOW VARIABLES where variable_name LIKE "character_set%" or variable_name like "collation%"').then((res)=>{
                  console.log(res)
                });*/
                if(nbMsg<limitMsg-1){
                  data.message=data.message.trim()
                  //data.message=JSON.stringify(data.message)    
                  //data.message=json_encode(data.message)    
                  //console.log(data.message)
                  const rex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug;
                  const updated = data.message.replace(rex, match => `\\u${match.codePointAt(0).toString(10)}\\u`);
                  //console.log(updated);  
                  data.message=updated;          
                  /*const emojiRegex = /\p{Emoji}/u;
                  const resss=emojiRegex.test(data.message); 
                  console.log(resss)
                  const emojis = data.message.match(/[\p{Emoji}\u200d]+/gu);
                  emojis.forEach(emoji => {
                    let unicode = "";
                    //element.codePointAt(0)      // 128517
                    //String.fromCodePoint(128517)
                    function getNextChar(pointer) {
                      const subUnicode = emoji.codePointAt(pointer);                  
                      if (!subUnicode) return;  
                      console.log('subUniCode')
                      console.log(subUnicode)
                      console.log(String.fromCodePoint(subUnicode))  
                      unicode += '-' + subUnicode.toString(16);
                      getNextChar(++pointer);
                    }
            
                    getNextChar(0);
                    console.log(unicode)
                  });*/
                  var requete='insert into messages(sender_id,receiver_id,message) values('+data.sender_id+','+
                  data.receiver_id+',"'+data.message+'")'
                  pool.query(`insert into messages(sender_id,receiver_id,message) values(?,?,?)`,[data.sender_id,data.receiver_id,data.message], (err, rows, fields) => {
                    if (err) throw err
                    // console.log(requete)
                  })
                  //pool.end()
                }else if(nbMsg==limitMsg-1){
                  console.log(data.message)
                  var requete='insert into messages(sender_id,receiver_id,message) values('+data.sender_id+','+
                  data.receiver_id+',"'+data.message+'")'
                  pool.query(`insert into messages(sender_id,receiver_id,message) values(?,?,?)`,[data.sender_id,data.receiver_id,data.message], (err, rows, fields) => {
                    if (err) throw err
                    // console.log(requete)
                  })
                  //pool.end()
                  data.limite='limite atteinte'
                }else{
                  data.erreur='limite message envoye'
                } 
                io.emit('SERVER_MSG', data);
              })
            
        })
  
    });
};

module.exports={socketConnection}