const bcrypt = require('bcrypt')

const hashing = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}
const comparing = (plainText, hash) => {
    return bcrypt.compareSync(plainText, hash)
}

module.exports = {
    hashing, comparing
}
