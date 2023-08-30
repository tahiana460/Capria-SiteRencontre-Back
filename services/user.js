const { pool } = require('../database');
const nodemailer=require('nodemailer')

const register = async (req, res) => {
    let data = req.body;

    const [result] = await pool.query(`INSERT INTO user(nom, prenom, mail, mdp, pseudo, sexe, dateDeNaissance, ville, nation, orientationSxl, photoDeProfil) VALUES (?, ?, ?, sha1(?), ?, ?, ?, ?, ?, ?, ?)`, [data.name, data.firstname, data.email, data.password, data.pseudo, data.gender, data.date_of_birth, data.city, data.nationality, data.sexual_orientation, data.profile_picture])
    //console.log(result)
    const ress={insertId:result.insertId,status:201,ok:true};
    //res.status(201).json(result.insertId);
    res.json(ress)
}

const getUser = async (req, res) => {
    const [user] = await pool.query("SELECT * FROM user");
    res.json(user);
}

const getUserById = async (req, res) => {
    const [user] = await pool.query("SELECT * FROM user WHERE id=?", [req.params.id]);
    res.json(user);
}

const getUserByPseudo = async (req, res) => {
    const [user] = await pool.query("SELECT * FROM user WHERE pseudo=?", [req.params.pseudo]);
    res.json(user);
}

const getUserByGoogle = async (req, res) => {
    const [user] = await pool.query("SELECT * FROM user WHERE google=?", [req.params.email]);
    res.json(user);
}

const getUserByEmail = async (req, res) => {
    var [user] = await pool.query("SELECT * FROM user WHERE mail=?", [req.params.email]);    
    if(user.length==0){
        const options = {method: 'GET'};
        const api_key='70b908491d62418884377fefd4deca8c';
        const mail=req.params.email;
        const url='https://emailvalidation.abstractapi.com/v1/?api_key='+api_key+'&email='+mail
        const response=await fetch(url, options)
        /*.then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));*/
        const resp=await response.json()
        //console.log(resp)
        if(resp.deliverability!='DELIVERABLE'){
            user={erreur:'e-mail non existance'}
        }
    }
    res.json(user);
}

const updateUserInformation = async (req, res) => {
    let data = req.body;
    await pool.query("UPDATE user SET nom=?, prenom=?, pseudo=?, sexe=?, dateDeNaissance=?, ville=?, nation=?, orientationSxl=? WHERE id=?", [data.name, data.firstname, data.pseudo, data.gender, data.dateOfBirth, data.city, data.nationality, data.sexualOrientation, req.params.id])
    res.status(204).json({state: 'User updated successfully'});
}

const updateUserMdp = async (req, res) => {
    let data = req.body;
    await pool.query("UPDATE user SET mdp=sha1(?)  WHERE id=?", [data.mdp,req.params.id])
    const ress={status:204,ok:true};
    res.json(ress);
}

const getAdmin = async (req, res) => {
    const [admin] = await pool.query("SELECT * FROM user WHERE estAdmin=1");
    res.json(admin);
}

const envoiMail = async (req,res) => {
    let data=req.body
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'test.email.kolo@gmail.com',
          pass: 'sqrzdnixdzmpwtlc'
        }
      });
      const href='http://localhost:3000/forgot-password?step=2&mail='+data.mail
      var mailOptions = {
        from: 'test.email.kolo@gmail.com',
        to: data.mail,
        subject: 'Réinitialisation mot de passe',
        text: '',
        html: '<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe. Ignorez ce mail si ce n\'est pas vous.</p><a href="'+href+'" > Réinitialiser mon mot de passe </a>'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log('Email sent: ' + info.response);
            res.send('Email sent: ' + info.response);
        }
      }); 
}

const addGoogleAccount = async (req, res) => {
    let data = req.body;
    await pool.query("UPDATE user SET google=?  WHERE id=?", [data.email,req.params.userId])
    res.status(204).json({state: 'Account associated'});
}

const removeGoogleAccount = async (req, res) => {
    await pool.query("UPDATE user SET google=NULL  WHERE id=?", [req.params.userId])
    res.status(204).json({state: 'Account dissociated'});
}

module.exports = { 
    register,
    getUser,
    getUserById,
    getUserByPseudo,
    getUserByEmail,
    updateUserInformation,
    getAdmin,
    envoiMail,
    updateUserMdp,
    getUserByGoogle,
    addGoogleAccount,
    removeGoogleAccount
};