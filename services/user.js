const { pool } = require('../database');

const register = async (req, res) => {
    let data = req.body;

    const [result] = await pool.query(`INSERT INTO user(nom, prenom, mail, mdp, pseudo, sexe, dateDeNaissance, ville, nation, orientationSxl, profile_picture) VALUES (?, ?, ?, sha1(?), ?, ?, ?, ?, ?, ?, ?)`, [data.name, data.firstname, data.email, data.password, data.pseudo, data.gender, data.date_of_birth, data.city, data.nationality, data.sexual_orientation, data.profile_picture])
    res.status(201).json(result.insertId);
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

const getUserByEmail = async (req, res) => {
    const [user] = await pool.query("SELECT * FROM user WHERE mail=?", [req.params.email]);
    res.json(user);
}

const updateUserInformation = async (req, res) => {
    let data = req.body;
    await pool.query("UPDATE user SET nom=?, prenom=?, pseudo=?, sexe=?, dateDeNaissance=?, ville=?, nation=?, orientationSxl=? WHERE id=?", [data.name, data.firstname, data.pseudo, data.gender, data.dateOfBirth, data.city, data.nationality, data.sexualOrientation, req.params.id])
    res.status(204).json({state: 'User updated successfully'});
}

const getAdmin = async (req, res) => {
    const [admin] = await pool.query("SELECT * FROM user WHERE estAdmin=1");
    res.json(admin);
}

module.exports = { 
    register,
    getUser,
    getUserById,
    getUserByPseudo,
    getUserByEmail,
    updateUserInformation,
    getAdmin
};