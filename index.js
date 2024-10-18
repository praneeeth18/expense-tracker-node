require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection.js');
const app = express();
const PORT = process.env.PORT || 3500;

//dbconnection
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/users", require('./routes/user.route.js'));
app.use("/api/expenses", require('./routes/expense.route.js'));
app.use("/api/budgets", require('./routes/budget.route.js'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}.`));
});

