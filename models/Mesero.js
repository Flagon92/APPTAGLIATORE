const {Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const meseroSchema = new Schema({
    nomMesero: String,
    email: String,
    password: String,
    turno: String
})

meseroSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

meseroSchema.method.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('Mesero', meseroSchema)