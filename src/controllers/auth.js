const db = require('../db');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({error: "Username and Password are required"});
    }
    
    //check if user already exists
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    const values = [username];
    if (await db.query(checkUserQuery, values)) {
        return res.status(409).json({error: "User already exists"});
    }

    //create new user
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


const userLogin = async(req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {    
    
    const getUserQuery = "SELECT * FROM users WHERE username = ?";
    const values = [username];

    const [users] = await db.query(getUserQuery,values);

    if (users.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
    )
    
    res.json({ token });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

module.exports = { registerUser, userLogin };
