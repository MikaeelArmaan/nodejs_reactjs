const jwt = require("jsonwebtoken")
const tokenGenerate = require("../bcripted/tokenGenerate.js")
const { userTypes } = require("../constants/userType.js")
const messages = require("../constants/messages.js")


module.exports.createAuthForGoogleUser = async function (req, res) {
  try {
    const user = res.locals.user
    let access_token = await tokenGenerate.generatedToken(user)
    const result = {}
    result.token = access_token
    result.user = user
    res.status(200).send({
      message: "success",
      result: result
    })

  } catch (err) {
    return res.status(401).json({
      message: err.message
    })
  }
}

module.exports.authenticatedAdmin = async (req, res, next) => {
  try {
    const token = req.headers["token"]
    if (!token) {
      throw new Error(messages.NO_TOKEN)
    }
    // validate token
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name == 'TokenExpiredError') throw new Error(messages.TOKEN_EXPIRES)
        throw new Error(messages.FAILED_TOKEN)
      } else {
        req.decoded = decoded.data
        if (req.decoded.type !== userTypes.ADMIN) {
          throw new Error(messages.NOT_AUTHORIZED)
        } else {
          return next()
        }
      }
    })
  } catch (err) {
    return res.status(401).json({
      message: err.message
    })
  }
}

module.exports.authenticatedAdminOrUser = async (req, res, next) => {
  try {
    const token = req.headers["token"]
    if (!token) {
      throw new Error(messages.NO_TOKEN)
    }
    // validate token
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name == 'TokenExpiredError') throw new Error(messages.TOKEN_EXPIRES)
        throw new Error(messages.FAILED_TOKEN)
      } else {
        req.decoded = decoded.data
        if (req.decoded.type !== userTypes.ADMIN && req.decoded.type !== userTypes.USER) {
          throw new Error(messages.NOT_AUTHORIZED)
        } else {
          return next()
        }
      }
    })
  } catch (err) {
    return res.status(401).json({
      message: err.message
    })
  }
}