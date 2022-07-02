function errorHandler(err, req, res, next) {
  if (err.name == 'SequelizeUniqueConstraintError') {
    res.status(400).json({ code: 409, error: 'Data With the same phonenumber already exist' })
  } else if (err.name == 'SequelizeValidationError') {
    let errors = []
    for (let i = 0; i < err.errors.length; i++) {
      errors.push(err.errors[i].message)
    }
    res.status(400).json({ error: errors.join(',') })
  } else {
    console.log(err)
    let status = err.status || 500
    let error = err.msg || 'Server error!'
    res.status(status).json({ error })
  }
}

module.exports = errorHandler
