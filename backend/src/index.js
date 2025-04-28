const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const {UserController} = require("./controllers/UserController")
const functions = require("firebase-functions")

const app = express()
app.use(express.json())
app.use(cors({ origin: true }))
app.use(helmet())

const db = require('./firebase');

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.post("/user", UserController.registerUser)
app.get("/user/id", UserController.getUser)

const billRoutes = require('./routes/billRoute');
app.use('/bills', billRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port:${port}`)
})

exports.api = functions.https.onRequest(app)

