const { pool } = require('../database');

const getNbMsgs = async (req, res) => {
    let data = req.body;

    const [result] = await pool.query(`select count(*) as nb from messages where sender_id=? and send_time>=?`, [data.sender_id, data.date_debut])
    res.status(200).json(result);
}

const getLastMessage = async (req, res) => {
    const [[message]] = await pool.query(`SELECT * FROM messages WHERE sender_id=? and receiver_id=? ORDER BY send_time DESC LIMIT 1`, [req.params.sender_id, req.params.receiver_id])
    res.status(200).json(message)
}
module.exports = { 
    getNbMsgs,
    getLastMessage
};