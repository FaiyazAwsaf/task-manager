const loadDashboard = (req, res) => {
    res.json({message: `Welcome to the dashboard, ${req.user.username}!`}); 
};

module.exports = { loadDashboard };
