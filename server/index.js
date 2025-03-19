// this is the entry point of our program
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const port = process.env.port || 5000;
const app = express();
const cors = require('cors')

connectDB();
app.use(cors());





app.listen(port, () => {
    console.log(`server listending on port ${port}`)
})

