const middleware = require("../../middlewares/index")
const express = require("express")
const Router = express.Router()

const ordersController = require('../../controllers/ordersController')

Router.get('/', ordersController.getAllOrdersList);
Router.get('/:id', ordersController.getOrderById);
Router.get('/:userid', ordersController.getOrdersByUserId);



module.exports = Router
