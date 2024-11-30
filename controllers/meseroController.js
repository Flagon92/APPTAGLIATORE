const jwt = require('jsonwebtoken')

const Mesero = require('../models/Mesero')
const config = require('../config/global')

exports.crearMesero = async (req, res) => {

    try{

        const { nomMesero, email, password, turno, activo} = req.body
        
        const mesero = new Mesero({
            nomMesero,
            email,
            password,
            turno,
            activo: activo !== undefined ? activo : true // Si no definimos activo, es true
        })

        mesero.password = await mesero.encryptPassword(mesero.password)

        await mesero.save()

        console.log('Mesero guardado:', mesero);
        
        const token = jwt.sign({id: mesero._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        })

        res.json({auth: true, token})

    }catch(error){
        console.log(error)
        res.status(500).send('Error creando mesero.')
    }

}

exports.obtenerMesero = async (req, res) => {

    try {

        const { email, password } = req.body
        const mesero = await Mesero.findOne({email: email})

        if(!mesero) return res.status(404).send('El mesero no existe')

        if (!mesero.activo) {
            return res.status(403).send('El mesero está desactivado.');
        }    

        const validPassword = await mesero.validatePassword(password)

        if(!validPassword) return res.status(401).json({auth: false, token: null})
        
        const token = jwt.sign({id: mesero._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        })

        res.json({auth: true, token})

    }catch(error){
        console.log(error)
        res.status(500).send('Error al validar el mesero.')
    }
}