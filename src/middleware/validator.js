const { check, validationResult } = require('express-validator');

const validateTask = [
    check('title').notEmpty().withMessage('Title is required').trim().escape(),
    check('status').isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateTask;
