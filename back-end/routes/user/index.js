const userController = require("../../controllers/userController")
const middleware = require("../../middlewares/index")
const express = require("express")
const Router = express.Router()

Router.post(
  "/register",
  userController.signup
)

Router.post(
  "/login",
  userController.login
)

Router.post(
  "/google-signin",
  userController.loginWithGoogle,
  middleware.authenticate.createAuthForGoogleUser
)

Router.get(
  "/user-details",
  middleware.authenticate.authenticatedAdmin,
  userController.getUsers
)


module.exports = Router
