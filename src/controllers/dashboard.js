const loadDashboard = (req, res) => {
    res.json({message: `You are an Admin. Welcome to the dashboard, ${req.user.username}!`}); 
};

module.exports = { loadDashboard };
