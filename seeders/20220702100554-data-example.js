'use strict'

const { hashing } = require('../helpers/bcrypt')
const rawdata = require('../seed.json')

const userData = rawdata.users.map((el) => ({
  name: el.name,
  password: hashing(el.password),
  email: el.email,
  phone: el.phone,
  createdAt: new Date(),
  updatedAt: new Date(),
}))
const articleData = rawdata.articles.map((el) => ({
  title: el.title,
  short_description: el.short_description,
  description: el.description,
  image: el.image,
  categoryId: el.categoryId,
  userId: el.userId,
  createdAt: new Date(),
  updatedAt: new Date(),
}))
const categoryData = rawdata.categories.map((el) => ({
  title: el.title,
  createdAt: new Date(),
  updatedAt: new Date(),
}))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface
      .bulkInsert('Users', userData, {})
      .then(() => {
        return queryInterface.bulkInsert('Categories', categoryData, {})
      })
      .then(() => {
        return queryInterface.bulkInsert('Articles', articleData, {})
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Categories', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Articles', null, { truncate: true, cascade: true, restartIdentity: true })
  },
}
