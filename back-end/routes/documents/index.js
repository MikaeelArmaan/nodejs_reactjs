const documentController = require("../../controllers/documentController")
const middleware = require("../../middlewares/isAuthenticate")
const express = require("express")
const Router = express.Router()

Router.post(
    "/create",
    middleware.authenticatedAdmin,
    documentController.createDocument
)

Router.get(
    "/get-documents",
    middleware.authenticatedAdminOrUser,
    documentController.getDocumentList
)

Router.delete(
    "/delete/:id",
    middleware.authenticatedAdmin,
    documentController.deleteDocumentById
)

module.exports = Router
