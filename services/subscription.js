const { pool } = require('../database');

const getSubscriptions = async (req, res) => {
    const [sub] = await pool.query("SELECT * FROM abo a JOIN type_abo ta ON a.id_type_abo=ta.id");
    res.json(sub);
}

const addSubscription = async (req, res) => {
    let data = req.body;

    const [result] = await pool.query(`INSERT INTO user_abo(id_abo, id_user, date_debut, date_fin, prix) VALUES (?, ?, NOW(), ?, ?)`, [data.id_abo, data.id_user, data.date_fin, data.prix])
    res.status(201).json(result.insertId);
}

const getLastUserSubscription = async (req, res) => {
    const [sub] = await pool.query(`SELECT * FROM user_abo WHERE id_user=? ORDER BY date_fin DESC LIMIT 1`, [req.params.userId]);
    res.json(sub);
}

module.exports = { 
    getSubscriptions,
    addSubscription,
    getLastUserSubscription
};