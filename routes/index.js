const router = require('express').Router()
const { authentication } = require('../middleware/auth')
const { auth, category, article } = require('../controllers/')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
var options = {
  explorer: true
}

// authorization
router.post('/api/auth/register', auth.register)
router.post('/api/auth/login', auth.login)

// categories
router.get('/api/categories', category.getCategories)
router.get('/api/category/:categoryid', category.getCategory)
router.post('/api/category', authentication, category.createCategory)

// articles
router.get('/api/articles', article.getArticles)
router.get('/api/article/:articleid', article.getArticle)
router.post('/api/article', authentication, article.createArticle)

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

module.exports = router
