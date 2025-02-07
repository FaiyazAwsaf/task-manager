const loadDashboard = (req, res) => {
    //get username from database not from the jwt token 
    res.json({message: `Welcome to the dashboard, ${req.user.username}!`}); 
};

module.exports = { loadDashboard };
