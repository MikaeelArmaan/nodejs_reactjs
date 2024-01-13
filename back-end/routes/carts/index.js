const middleware = require("../../middlewares/index")
const express = require("express")
const Router = express.Router()

const cartController = require('../../controllers/cartController')

Router.get('/', cartController.getCartList);
Router.get('/:id', cartController.getCartByUserId);

Router.post(
    "/create",
    middleware.authenticate.authenticatedAdmin,
    cartController.createCart
)

Router.delete(
    "/delete/:id",
    middleware.authenticate.authenticatedAdmin,
    cartController.deleteCartById
);

module.exports = Router
