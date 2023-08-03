const { pool } = require('../database');

const getSubscriptions = async (req, res) => {
    const [sub] = await pool.query("SELECT * FROM abo a JOIN type_abo ta ON a.id_type_abo=ta.id");
    res.json(sub);
}

module.exports = { 
    getSubscriptions
};