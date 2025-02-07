const db = require('../db'); 


const getAllTasks = async (req, res) => {
    try {
        let { page = 1, limit = 10, status } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        const offset = (page - 1) * limit; 

        let query = 'SELECT * FROM tasks';
        let queryParams = [];

        if (status) {
            query += ' WHERE status = ?';
            queryParams.push(status);
        }

        query += ' LIMIT ? OFFSET ?'; 
        queryParams.push(limit, offset);

        const [tasks] = await db.query(query, queryParams);

        const countQuery = 'SELECT COUNT(*) AS total FROM tasks' + (status ? ' WHERE status = ?' : '');
        const [countResult] = await db.query(countQuery, status ? [status] : []);
        const totalTasks = countResult[0].total;

        res.json({
            page,
            limit,
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            tasks,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, status, due_date, created_at} = req.body;
        
        const query = due_date
        ? 'INSERT INTO tasks (title, status, due_date) VALUES (?, ?, ?)'
        : 'INSERT INTO tasks (title, status) VALUES (?, ?)';

        const values = due_date ? [title, status, due_date] : [title, status];

        const [result] = await db.query(query, values);
        
        res.status(201).json({ id: result.insertId, title, status, due_date, created_at });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTask = (req, res) => {
    res.send("The task is updated");
}

const deleteTask = (req, res) => {
    res.send("The task is deleted");
}

const getTaskById = (req, res) => {
    res.send("Get task by id");
}


module.exports = {
    getAllTasks,
    getTaskById,
    deleteTask,
    updateTask,
    createTask
}