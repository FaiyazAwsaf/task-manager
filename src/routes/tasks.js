const express = require('express');
const router = express.Router();
const validateTask = require('../middleware/validator.js');
const {getAllTasks, deleteTask, updateTask, createTask, getTaskById} = require('../controllers/tasks.js');


router.route('/').get(getAllTasks).post(validateTask,createTask);
router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 */

/**
 * @swagger
 * /tasks:
 *   post:
  *     summary: Create a new task
 *     description: Add a new task with title, status, and optional due date.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete project report"
 *               status:
 *                 type: string
 *                 enum: ["pending", "in-progress", "completed"]
 *                 example: "pending"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-10"
 *     responses:
 *       201:
 *         description: Task created successfully
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieve a specific task using its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     description: Update a task's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Remove a task from the task manager
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */

module.exports = router;