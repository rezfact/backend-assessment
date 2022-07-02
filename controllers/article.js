const Sequelize = require('sequelize')
const { Article, sequelize } = require("../models")
const Op = Sequelize.Op;

class ArticleController {
  static async getArticles(req, res, next) {
		let limit =  req.body.size != 0 ? req.body.size : 10
		let offset =  req.body.page
		let search =  req.body.search != '' ? req.body.search : ''

		const getCount = await Article.count({where: {title: {
			[Op.like]: `%${search}%`
		  }}})

		const getData = await Article.findAll({
			where:{ title: { [Op.like]: `%${search}%` }},
			limit,
			offset
		})
		
		res.status(200).json({
			code: 200,
			content: getData,
			meta: {
				page: offset + 1,
				size: limit,
				totalData: getCount

			},
			message: "Data Found"
		})
		

	}

  static getArticle(req, res, next) {
		const options = {
			attributes: { exclude: ["createdAt", "updatedAt"] },
		}
		Article.findByPk(req.params.articleid, options)
			.then((result) => {
				res.status(200).json(result)
			})
			.catch((err) => {
				next(err)
			})
	}

  static async createArticle(req, res, next) {
    const { title, short_description, description, image, userId, categoryId } = req.body
    const article = { title, short_description, description, image, userId, categoryId }

		let transaction
		let result
		try {
			// get transaction
			transaction = await sequelize.transaction()
			result = await Article.create(article)
			await transaction.commit()
			res.status(201).json({
				code: 201,
				content: result,
				totalItems: 1,
				message: "Article Created"
			})
		} catch (err) {
			// Rollback transaction only if the transaction object is defined
			console.log(`error`, err)
			if (transaction) {
				await transaction.rollback()
				next(err)
			}
		}
	}
}

module.exports = ArticleController
