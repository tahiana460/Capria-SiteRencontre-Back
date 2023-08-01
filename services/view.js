const { pool } = require('../database');

const addView = async (req, res) => {
    let data = req.body;

    const [result] = await pool.query(`INSERT INTO vues(visited_id, visitor_id, date_visite) VALUES (?, ?, ?)`, [data.visited_id, data.visitor_id, data.date_visite])
    res.status(201).json(result.insertId);
}

const getAllUsersView = async (req, res) => {
    const [views] = await pool.query("SELECT * FROM vues WHERE visited_id=?", [req.params.userId]);
    res.json(views);
}

const getVisitors = async (req, res) => {
    const [views] = await pool.query("SELECT * FROM vues v JOIN user u on v.visitor_id = u.id  WHERE v.visited_id=?", [req.params.userId]);
    res.json(views);
}

module.exports = { 
    addView,
    getAllUsersView,
    getVisitors
};