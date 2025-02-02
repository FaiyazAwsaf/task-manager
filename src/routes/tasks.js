const express = require('express');
const router = express.Router();

const {getAllTasks, deleteTask, updateTask, createTask, getTaskById} = require('../controllers/tasks.js');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask);


module.exports = router;