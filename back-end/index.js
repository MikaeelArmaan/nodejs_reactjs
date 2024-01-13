// configure dotenv file
require("dotenv").config()

// import modules
const express = require("express")
const db = require("./db/index.js")
const error = require("./middlewares/error.js")
// port number at which server is running
const port = process.env.PORT
// express app
const app = express()

// middleware to handle json object
app.use(express.json())
// middleware to handle url encoded form data object
app.use(express.urlencoded({ extended: true }))

// connecting database
db.sequelize
  .sync()
  .then(() => {
    console.log("db connected")
  })
  .catch(function (err) {
    throw err
  })

// ENDPOINT
app.use("/api", require("./routes/index.js"))

// middleware for handling internal server error
app.use(error)

// Middleware for unknown endpoints
app.use(function (req, res, next) {
    return res.status(404).send({
      message: 'Route ' + req.url + ' Not found.',
      data: null
    })
})

// server listening
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in server listening :-${err}`)
    return;
  }
  console.log(`Http app listening on port ${port}!`);
})