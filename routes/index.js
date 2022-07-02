const router = require('express').Router()
const { authentication } = require('../middleware/auth')
const { auth, category, article } = require('../controllers/')

// authorization
router.post('/api/auth/register', auth.register)
router.post('/api/auth/login', auth.login)

// categories
router.get('/api/category', category.getCategories)
router.get('/api/category/:categoryid', category.getCategory)
router.post('/api/category', authentication, category.createCategory)

// articles
router.get('/api/article', article.getArticles)
router.get('/api/article/:articleid', article.getArticle)
router.post('/api/article', authentication, article.createArticle)

module.exports = router
