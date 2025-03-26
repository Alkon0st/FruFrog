// this is the entry point of our program
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoute');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/auth', authRoutes);



const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`server listending on localhost:${port}`)
})
// console.log('Routes loaded:', app._router.stack);
