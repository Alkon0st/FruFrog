
// this is the entry point of our program
var express = require('express');

const port = process.env.port || 5000;
const app = express();
const cors = require('cors')

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Hello')
})



app.listen(port, () => {
    console.log(`server listending on port ${port}`)
})

