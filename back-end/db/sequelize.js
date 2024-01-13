const Sequelize = require("sequelize")
const env = process.env.NODE_ENV
//const env = "staging"
const config = require("../config/config.json")[env]
// connection with dataBase
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

module.exports = sequelize
