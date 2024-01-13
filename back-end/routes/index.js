const Express = require("express")
const Router = Express.Router()

Router.get("/check", (req, res) => {
  res.send("OK")
})

Router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, token, Accept"
  )
  next()
})

Router.use("/user", require("./user/index"));
Router.use("/document", require("./documents/index"))
Router.use("/orders", require("./orders/index"))
Router.use("/products", require("./products/index"))
Router.use("/carts", require("./carts/index"))

module.exports = Router;
