const { pool } = require('../database');
var formidable = require('formidable');

const upload = async (req, res) => {
    let data = req.body;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err) console.log(err)
        //console.log(fields)
        //console.log(files.file)
        //console.log(form)
        console.log(files)
        console.log(fields)
        
    });
    const result={'message':"ok"}
    //const [result] = await pool.query(`INSERT INTO user(nom, prenom, mail, mdp, pseudo, sexe, dateDeNaissance, ville, nation, orientationSxl, photoDeProfil) VALUES (?, ?, ?, sha1(?), ?, ?, ?, ?, ?, ?, ?)`, [data.name, data.firstname, data.email, data.password, data.pseudo, data.gender, data.date_of_birth, data.city, data.nationality, data.sexual_orientation, data.profile_picture])
    res.status(201).json(result);
}


module.exports = { 
    upload
};