const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');
const auth = require('./routes/auth.js');
const logger = require('./middleware/logger.js');
const { swaggerDocs, swaggerUi } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



//middleware
app.use(express.json());
app.use(logger);

//routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/tasks', tasks);


//server concetion
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("Swagger docs available at http://localhost:3000/api-docs");

});
