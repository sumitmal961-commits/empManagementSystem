
const express = require('express')
const app = express()
const path = require('path');

require('dotenv').config()
require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const EmpRouter = require('./Routes/EmpRouter')

const port = process.env.PORT || 8080


app.get('/', (req, res) => {
    res.send("Hello Guys! Server is running......")
})


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json())
app.use(cors()) 
app.use('/auth', AuthRouter)
app.use('/api/employees', EmpRouter)
 

app.listen(port, () => {
    console.log("server running in port ", port)
})

