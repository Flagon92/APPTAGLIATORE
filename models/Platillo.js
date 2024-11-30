const { Schema, model } = require('mongoose')

// Definir el esquema de platillo
const platilloSchema = new Schema({
    nombre: { type: String, unique: true, required: true }, 
    descripcion: { type: String, required: true },
    ingredientes: { type: String, required: true},
    precio: {type: String, required: true},
    urlImg: {type: String, required: true},
}, {
    timestamps: true // Agrega automáticamente createdAt y updatedAt
})

// Crear el modelo a partir del esquema
module.exports = model('Platillos', platilloSchema)
