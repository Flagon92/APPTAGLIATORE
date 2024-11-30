const { Schema, model } = require('mongoose');

const ordenSchema = new Schema({
    idMesa: { type: String, required: true }, 
    idPlatillo: { type: String, required: true }, 
    cantidad: { type: Number, required: true, default: 1, min: 1 }, 
    total: { type: Number, required: true },
    estado: { type: String, enum: ['pendiente', 'entregado', 'cancelado'], default: 'pendiente' },
    fecha: { type: Date, default: Date.now }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = model('Orden', ordenSchema);
