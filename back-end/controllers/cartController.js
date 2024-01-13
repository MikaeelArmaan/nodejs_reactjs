const db = require("../db/db.js")
const { cart_schema } = require("../joiValidations/cartValidate.js")
const messages = require("../constants/messages.js")
const Op = require('sequelize').Op
const _ = require("lodash")


module.exports.createCart = async (req, res) => {
 
  try {
    const { userId, products } = req.body;

    // check validation of coming data
    //await cart_schema.validateAsync(req.body);

    // storing data into database

    let cartDetails = await db.Cart.findOne({ where: { userId} })

    if (!cartDetails) {
      const cart = await db.Cart.create({
        userId,
        products,
        //created_by: req?.decoded?.id
      })

      return res.status(201).json({
        cart: cart,
        message: messages.CREATION,
      })
    }
    else {
      await db.Cart.update({ products }, { where: { userId } })
      return res.status(200).send({
        message: messages.UPDATED,
        cart: await db.Cart.findOne({ where: { userId } }),
      })
    }

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
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}


module.exports.getCartList = async (req, res) => {
  try {
    const options = {}
    if (req.query.body) {
      options.where = {}
      options.where = req.query.body
    }
   
    //options.attributes = { exclude: ["createdAt", "updatedAt", "deletedAt", "created_by", "updated_by", "deleted_by"] }
    const cartList = await db.Cart.findAll(options)

    return res.status(200).json({
      message: cartList.length ? messages.DATA_FOUND : messages.MATCH_NOT_FOUND,
      result: cartList
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}

module.exports.getCartByUserId = async (req, res) => {
  try {
    let cartDetails = await db.Cart.findOne({ where: { userId: req.params.userId } })

    if (!cartDetails) {
      return res.status(404).send({
        message: messages.cart_NOT_FOUND
      })
    }
    return res.status(200).json({
      message: cartDetails.length ? messages.LINKS_FOUND : messages.MATCH_NOT_FOUND,
      result: cartDetails
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}


module.exports.deleteCartById = async (req, res) => {
  try {
    let cartDetails = await db.Cart.findOne({ where: { id: req.params.id } })

    if (!cartDetails) {
      return res.status(404).send({
        message: messages.CART_NOT_FOUND
      })
    }
    await db.Cart.update({ deleted_by: req?.decoded?.id }, { where: { id: req.params.id } })
    await cartDetails.destroy()
    return res.status(200).send({
      message: messages.DELETE_CART
    })
  } catch (err) {
    return res.status(500).json({
      message: req.params.id
    })
  }
}
