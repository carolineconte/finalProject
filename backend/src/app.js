require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/Router.js')
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

// Upload directory
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use('/src/uploads', express.static(path.join(__dirname, 'uploads')))




//DB connection
require("./config/db.js")

app.use(router)

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Server listen on http://localhost:${PORT} `)
})



// module.exports = app
