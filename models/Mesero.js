const {Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const meseroSchema = new Schema({
    nomMesero: String,
    email: { type: String, unique: true }, 
    password: String,
    turno: String,
    activo: { type: Boolean, default: true }
})

meseroSchema.methods.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)

    return bcrypt.hash(password, salt)
}

meseroSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('Mesero', meseroSchema)