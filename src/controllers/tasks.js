const db = require('../db'); 


const getAllTasks =  async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT * FROM tasks');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTask = (req, res) => {
    res.send("A new task is added");
}

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