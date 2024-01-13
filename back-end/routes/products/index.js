const middleware = require("../../middlewares/index")
const express = require("express")
const Router = express.Router()
const isAdminVerifier = middleware.authenticate.authenticatedAdmin;
const ProductController = require('../../controllers/productsController')

Router.get('/', ProductController.getProductList);
Router.get('/:id', ProductController.getProductById);
Router.post('/', isAdminVerifier, ProductController.createProduct);
Router.put('/:id', isAdminVerifier, ProductController.updateProductById);
Router.delete('/:id', isAdminVerifier, ProductController.deleteProductById);


module.exports = Router
