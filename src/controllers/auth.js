const db = require('../db');
const bcrypt = require('bcryptjs');

const registerUser = async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({error: "Username and Password are required"});
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = "Insert INTO users(username, password) VALUES(?, ?)";
        const values = [username, hashedPassword];

        const [result] = await db.query(insertUserQuery, values);

        res.status(201).json({message: "User registered successfullt"});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = { registerUser };
