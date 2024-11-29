const jwt = require('jsonwebtoken')

const Mesero = require('../models/Mesero')
const config = require('../config/global')

exports.crearMesero = async (req, res) => {

    try{

        const { nomMesero, email, password, turno} = req.body
        
        const mesero = new Mesero({
            nomMesero,
            email,
            password,
            turno
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