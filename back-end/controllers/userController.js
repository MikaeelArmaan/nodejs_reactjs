const db = require("../db/db.js")
const {
  user_schema,
  user_login_schema,
} = require("../joiValidations/userValidate.js")
const hashPassword = require("../bcripted/password.js")
const tokenGenerate = require("../bcripted/tokenGenerate.js")
const messages = require("../constants/messages.js")
const { listOfAdmin } = require("../constants/AdminList.js")
const { userTypes } = require("../constants/userType.js")
const _ = require("lodash")
const axios = require("axios")

// creating a new user
module.exports.signup = async (req, res) => {
  try {
    // check validation of coming data
    await user_schema.validateAsync(req.body);

    // bcrypt the password
    let bcryptedPassword = await hashPassword.bcryptPassword(req.body.password);

    // storing data into database
    const user = await db.User.create({
      email: req.body.email,
      password: bcryptedPassword,
      account_type: req.body.type,
    }) // once created do response

    return res.status(201).json({
      data: {
        email: user.email,
        accountType: user.account_type
      },
      message: messages.CREATION,
    })
  } catch (err) {
    /// if get a joi validation err
    if (err.details) {
      return res.status(422).json({
          message: err.details[0].message
      })
    }
    // if validation is fine but user exist
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(403).json({
        message: messages.ALREADY_EXIST
      })
    }

    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR,
    })
  }
}

// login
module.exports.login = async (req, res) => {
  try {
    // check validation of coming data
    await user_login_schema.validateAsync(req.body)

    // get details of a user
    const user = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
    // if user is signedUp
    if (user) {
      const userData = {
        email: user.email,
        type: user.account_type
      }
      // check password
      let matchPassword = await hashPassword.compareHashPassword(
        req.body.password,
        user.password
      )
      if (matchPassword) {
        // generate token
        let access_token = await tokenGenerate.generatedToken(userData);

        let userInfo = {}
        userInfo.email = user.email
        userInfo.type = user.account_type
        userInfo.picture = user.picture
        userInfo.name = user.email
        // return information
        return res.status(200).json({
          result: {
            access_token,
            user:userInfo
          },
          message: messages.TOKEN_GENERATED,
        })
      } else {
        return res.status(401).json({
          message: messages.WRONG_EMAIL_PASSWORD,
        })
      }
    }
    // if user is not signed up
    else {
      return res.status(400).json({
        message: messages.NOT_REGISTERED,
      });
    }
  } catch (err) {
    // if get a joi validation err
    if (err.details) {

        return res.status(422).json({
            message: err.details[0].message
        })
  
    }
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR,
    })
  }
}

// login with google
module.exports.loginWithGoogle = async (req, res, next) => {
  try {
    const { access_token } = req.body
    if (!access_token) {
      throw new Error(messages.NO_TOKEN)
    }
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }
    )
    const [userDetail, isNewUserCreated] = await db.User.findOrCreate({
      where: {
        email: response.data.email,
        account_type: _.includes(listOfAdmin, response.data.email) ? userTypes.ADMIN : userTypes.USER,
        provider: "google"
      },
    })
    let user = {}
    user.email = userDetail.email
    user.type = userDetail.account_type
    user.picture = response.data.picture
    user.name = response.data.name
    res.locals.user = user
    return next()
  } catch (err) {
    if (err.message) {
      return res.status(400).json({
        message: err.message
      })
    }
  }
}

module.exports.getUsers = async (req, res) => {
  try {
    const userList = await db.User.findAll({ attributes: ["id", "email", "account_type"] })
  
    return res.status(200).json({
      message: userList.length ? messages.USERS_FOUND : messages.USERS_NOT_FOUND,
      result: userList
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}
