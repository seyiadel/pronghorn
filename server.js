const express  = require('express');
const app = express();
const mongoDatabase = require('./config/database');
const userRouter = require('./routes/user');

let PORT = 3000;

// Assigned Routes
app.use('/api/v1', userRouter);

app.listen(PORT, (err)=>{
    if (err) {
        console.log(`[FAILED] - Something wrong with server.${err}`)
    }else{
        console.log(`[SUCCESS] - Server running at localhost:${PORT}`)
    }
})