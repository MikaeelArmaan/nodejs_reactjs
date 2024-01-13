const db = require("../db/db.js")
const { document_schema } = require("../joiValidations/documentValidate.js")
const messages = require("../constants/messages.js")
const Op = require('sequelize').Op
const _ = require("lodash")


module.exports.createProduct = async (req, res) => {
  try {
    // check validation of coming data
    await document_schema.validateAsync(req.body);

    const { documentLink, department, documentType, geography, technology, domain, client, fileType, description } = req.body
    // storing data into database
    const document = await db.Document.create({
      documentLink,
      department,
      documentType,
      geography,
      technology,
      domain,
      client,
      fileType,
      description,
      created_by: req?.decoded?.id
    })
    
    const data = document.get({ plain: true })
    const documentData = _.omit(data, [
      "updatedAt",
      "createdAt",
      "deletedAt",
      "created_by",
      "deleted_by",
      "updated_by"
    ])

    return res.status(201).json({
      document: documentData,
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

module.exports.getProductList = async (req, res) => {
  try {
    const options = {}
    if (req.query.body) {
      options.where = {}
      options.where = req.query.body
    }
    if (req.query.description) {
      options.where = {
        ...options.where,
        description: { [Op.iLike]: '%' + req.query.description + '%' }
      }
    }
    options.attributes = { exclude: ["createdAt", "updatedAt", "deletedAt", "created_by", "updated_by", "deleted_by"] }
    const productList = await db.Document.findAll(options)

    return res.status(200).json({
      message: documentList.length ? messages.LINKS_FOUND : messages.MATCH_NOT_FOUND,
      result: documentList
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}

module.exports.getProductById = async (req, res) => {
  try {
    let documentDetails = await db.Document.findOne({ where: { id: req.params.id } })

    if (!documentDetails) {
      return res.status(404).send({
        message: messages.DOCUMENT_NOT_FOUND
      })
    }
    await db.Document.update({ deleted_by: req?.decoded?.id }, { where: { id: req.params.id } })
    await documentDetails.destroy()
    return res.status(200).send({
      message: messages.DELETE_DOCUMENT
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}

module.exports.updateProductById = async (req, res) => {
  try {
    let documentDetails = await db.Document.findOne({ where: { id: req.params.id } })

    if (!documentDetails) {
      return res.status(404).send({
        message: messages.DOCUMENT_NOT_FOUND
      })
    }
    await db.Document.update({ deleted_by: req?.decoded?.id }, { where: { id: req.params.id } })
    await documentDetails.destroy()
    return res.status(200).send({
      message: messages.DELETE_DOCUMENT
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}

module.exports.deleteProductById = async (req, res) => {
  try {
    let documentDetails = await db.Document.findOne({ where: { id: req.params.id } })

    if (!documentDetails) {
      return res.status(404).send({
        message: messages.DOCUMENT_NOT_FOUND
      })
    }
    await db.Document.update({ deleted_by: req?.decoded?.id }, { where: { id: req.params.id } })
    await documentDetails.destroy()
    return res.status(200).send({
      message: messages.DELETE_DOCUMENT
    })
  } catch (err) {
    return res.status(500).json({
      message: messages.INTERNAL_SERVER_ERROR
    })
  }
}