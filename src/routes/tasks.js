const express = require('express');
const router = express.Router();
const validateTask = require('../middleware/validator.js');
const {getAllTasks, deleteTask, updateTask, createTask, getTaskById} = require('../controllers/tasks.js');


router.route('/').get(getAllTasks).post(validateTask,createTask);
router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask);


module.exports = router;