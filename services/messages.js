const { pool } = require('../database');

const getNbMsgs = async (req, res) => {
    let data = req.body;

    const [result] = await pool.query(`select count(*) as nb from messages where sender_id=? and send_time>=?`, [data.sender_id, data.date_debut])
    res.status(200).json(result);
}

module.exports = { 
    getNbMsgs
};