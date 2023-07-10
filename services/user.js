const { pool } = require('../database');

const register = async (req, res) => {
    let data = req.body;
    // console.log(data.nom);

    const [result] = await pool.query(`INSERT INTO user(nom, prenom, mail, mdp, pseudo, sexe, dateDeNaissance, ville, nation, orientationSxl) VALUES (?, ?, ?, sha1(?), ?, ?, ?, ?, ?, ?)`, [data.nom, data.prenom, data.mail, data.mdp, data.pseudo, data.sexe, data.dateDeNaissance, data.ville, data.nation, data.orientationSxl])
    res.status(201).json(result.insertId);
}

const getUser = async (req, res) => {
    const [user] = await pool.query("SELECT * FROM user");
    res.json(user);
}

module.exports = { 
    register,
    getUser,
};