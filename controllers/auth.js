const { User } = require("../models")
const { comparing } = require("../helpers/bcrypt")
const generateToken = require("../helpers/jsonwebtoken")

class AuthController {
	static async register(req, res, next) {
		const getEmail = await User.count({where: {email: req.body.email}})
		if(getEmail > 0) res.json({code: 409, message: 'Data With the same email already exist'})

		const addUser = await User.create(req.body)
			.then((value) => {
				const str = JSON.stringify(value)
				const arr = JSON.parse(str)
				return {
					name: arr.name,
					email: arr.email,
					password: arr.password,
					phone: arr.phone,
					id: arr.id,
				}
			})
			.catch((err) => {next(err)})

		res.json({
			code:200, 
			content: addUser,
			totalItems: 1,
			message:'Register Success'
		})
	}

	static login(req, res, next) {
		const { email, password } = req.body
		User.findOne({ where: { email } })
			.then((user) => {
				if (!user) next({
					status: 400,
					msg: `Email ${email} is not found!`
				})
				
				const isCorrect = comparing(password, user.password)
				if (!isCorrect) next({
					status: 401,
					msg: "Password not match!"
				})
				
				const payload = {
					id: user.id,
					name: user.name,
					email: user.email,
				}
				
				const access_token = generateToken(payload)

				const result = {
					id: user.id,
					name: user.name,
					email: user.email,
					password: user.password,
					phone: user.phone,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					token: access_token
				}

				res.status(200).json({
					code: 200,
					content: result,
					totalItems: 1,
					message: 'Success Login'
				})
				
			})
			.catch((error) => {
				console.log(error)
			})
	}
}

module.exports = AuthController
