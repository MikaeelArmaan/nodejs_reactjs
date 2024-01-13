const db = require("../db/db.js")
const { document_schema } = require("../joiValidations/documentValidate.js")
const messages = require("../constants/messages.js")
const Op = require('sequelize').Op
const _ = require("lodash")


module.exports.getAllOrdersList = async (req, res) => {
  try {
    const options = {}
    if (req.query.body) {
      options.where = {}
      options.where = req.query.body
    }
   
    options.attributes = { exclude: ["createdAt", "updatedAt", "deletedAt", "created_by", "updated_by", "deleted_by"] }
    const orderList = await db.Orders.findAll(options)

    return res.status(200).json({
      message: orderList.length ? messages.LINKS_FOUND : messages.MATCH_NOT_FOUND,
      result: orderList
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}

module.exports.getOrderById = async (req, res) => {
  try {
    let orderDetails = await db.Orders.findOne({ where: { id: req.params.id } })

    if (!orderDetails) {
      return res.status(404).send({
        message: messages.DOCUMENT_NOT_FOUND
      })
    }
    return res.status(200).json({
      message: orderDetails.length ? messages.LINKS_FOUND : messages.MATCH_NOT_FOUND,
      result: orderDetails
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}


module.exports.getOrdersByUserId = async (req, res) => {
  try {
    let orderDetails = await db.Orders.findOne({ where: { userId: req.params.userid } })

    if (!orderDetails) {
      return res.status(404).send({
        message: messages.DOCUMENT_NOT_FOUND
      })
    }
    return res.status(200).json({
      message: orderDetails.length ? messages.LINKS_FOUND : messages.MATCH_NOT_FOUND,
      result: orderDetails
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}
