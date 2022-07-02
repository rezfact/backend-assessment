const { Category, Article, User } = require("../models")


class CategoryController {
  	static async getCategories(req, res, next) {
		const getCount = await Category.count()
		const getData = await Category.findAll()
			.then((value) => {
				const str = JSON.stringify(value)
				const arr = JSON.parse(str)
				return arr.map((v) => {return {id: v.id, title: v.title}})
			})

		res.json({
			code:200, 
			content: getData,
			totalItems: getCount,
			message:'Data Found' 
		})
	}

	static async getCategory(req, res, next) {
		const getCount = await Category.count({where: {id: req.params.categoryid}})
		if(getCount === 0) {
			res.json({code: 404, message: 'Data Not Found'})
		} else {
			const getData = await Category.findAll({where: {id: req.params.categoryid}})
			.then((value) => {
				const str = JSON.stringify(value)
				const arr = JSON.parse(str)
				return arr.map((v) => {return {id: v.id, title: v.title}})
			})
		
			res.json({
				code:200, 
				content: getData,
				totalItems: getCount,
				message:'Data Found' 
			})
		}
	}

	static async createCategory(req, res, next) {
		const getCount = await Category.count({where: {title: req.body.title}})
		if(getCount > 0) {
			res.json({code: 400, message: 'Category Already Exist'})
		} else {
			const category = {
				title: req.body.title
			}
	
			await Category.create(category)
				.then((result) => {
					res.status(200).json(result)
				})
				.catch((err) => {
					next(err)
				})
		}
	}
}

module.exports = CategoryController
