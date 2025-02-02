const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');

//middleware
app.use(express.json());

//routes
app.get('/home', (req, res) => {
    res.send("Task Manager App");
})

app.use('/api/v1/tasks', tasks);


//server concetion
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
