const jwt = require('jsonwebtoken')

const Mesero = require('../models/Mesero')
const config = require('../config/global')

exports.crearMesero = async (req, res) => {

    try{
        const { nomMesero, email, password, turno} = req.body
        console.log(nomMesero, email, password, turno)

    }catch(error){
        console.log(error)
        res.status(500).send('Error creando mesero.')
    }

}