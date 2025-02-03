const db = require('../db'); 


const getAllTasks =  async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT title, status, due_date FROM tasks');
        res.json(tasks);
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