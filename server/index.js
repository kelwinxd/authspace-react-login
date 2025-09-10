const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoute')

//middleware
app.use(express.json())
app.use(cors())

//Route
app.use('/api/auth', authRouter)

//mongodb connection
mongoose
    .connect('mongodb://localhost:27017/authent')
    .then(() => console.log('Connected'))
    .catch((error) => console.error('failed to connect',error))

//Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

//Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log('App running', PORT);
    
})
