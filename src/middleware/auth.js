const jwt = require('jsonwebtoken');
const db = require('../db');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        
        const getUserQuery = "SELECT * FROM users WHERE id = ?";
        const values = [data.id];
        
        const [users] = await db.query(getUserQuery, values);

        if (users.length === 0) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = users[0]; 
        next();
    } catch (err) {
        return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = authenticateToken;
