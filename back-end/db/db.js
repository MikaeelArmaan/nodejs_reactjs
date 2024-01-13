const Sequelize = require('sequelize')
const sequelize = require('./sequelize')
const UserModel = require('../model/user')
const DocumentModel = require('../model/document')
const Product = require('../model/product')
const Cart = require('../model/cart')
const Orders = require('../model/orders')

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Models/tables
db.User = UserModel(sequelize, Sequelize)
db.Document = DocumentModel(sequelize, Sequelize)
db.Products = Product(sequelize, Sequelize); 
db.Cart = Cart(sequelize, Sequelize);
db.Orders   = Orders(sequelize, Sequelize);
module.exports = db