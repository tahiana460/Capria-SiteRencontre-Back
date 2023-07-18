const { pool } = require('../database');

const register = async (req, res) => {
    let data = req.body;
    // console.log(data.nom);

    const [result] = await pool.query(`INSERT INTO user(nom, prenom, mail, mdp, pseudo, sexe, dateDeNaissance, ville, nation, orientationSxl, photoDeProfile) VALUES (?, ?, ?, sha1(?), ?, ?, ?, ?, ?, ?, ?)`, [data.name, data.firstname, data.email, data.password, data.pseudo, data.gender, data.date_of_birth, data.city, data.nationality, data.sexual_orientation, data.profile_picture])
    res.status(201).json(result.insertId);
}

const getUser = async (req, res) => {
    const [user] = await pool.query("SELECT * FROM user");
    res.json(user);
}

const getUserByPseudo = async (req, res) => {
    const [user] = await pool.query("SELECT * FROM user WHERE pseudo=?", [req.params.pseudo]);
    res.json(user);
}

const getUserByEmail = async (req, res) => {
    const [user] = await pool.query("SELECT * FROM user WHERE mail=?", [req.params.email]);
    res.json(user);
}

module.exports = { 
    register,
    getUser,
    getUserByPseudo,
    getUserByEmail
};