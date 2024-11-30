const jwt = require('jsonwebtoken')

const Mesero = require('../models/Mesero')
const config = require('../config/global')

exports.crearMesero = async (req, res) => {

    try{

        const { nomMesero, email, password, turno, activo} = req.body

        // Verifica si ya existe un mesero con el mismo email
        const meseroExistente = await Mesero.findOne({ email });
        if (meseroExistente) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }
        
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

exports.listarMeseros = async (req, res) => {
    try {
        // Busca solo los meseros que están activos
        const meseros = await Mesero.find({ activo: true });

        // Verifica si no hay meseros activos
        if (meseros.length === 0) {
            return res.status(404).json({ message: 'No hay meseros activos para mostrar' });
        }

        // Devuelve los meseros activos
        res.json(meseros);
    } catch (error) {
        console.error('Error al listar los meseros:', error);
        res.status(500).json({ message: 'Error al listar los meseros' });
    }
};

exports.actualizarMesero = async (req, res) => {
    try {
        const { email } = req.params; // Obtén el email de los parámetros de la ruta
        const { nomMesero, turno, activo } = req.body; // Campos a actualizar

        // Busca el mesero por email
        const mesero = await Mesero.findOne({ email });

        if (!mesero) {
            return res.status(404).json({ message: 'El mesero no existe' });
        }

        // Verifica si el mesero está activo
        if (!mesero.activo) {
            return res.status(403).json({ message: 'El mesero está desactivado y no se puede actualizar' });
        }

        // Actualiza solo los campos proporcionados
        mesero.nomMesero = nomMesero || mesero.nomMesero;
        mesero.turno = turno || mesero.turno;
        if (activo !== undefined) mesero.activo = activo; // Solo actualiza si "activo" se proporciona

        await mesero.save(); 

        res.json({ message: 'Mesero actualizado correctamente', mesero });
    } catch (error) {
        console.error('Error al actualizar el mesero:', error);
        res.status(500).json({ message: 'Error en el servidor al actualizar el mesero' });
    }
};

exports.eliminarMesero = async (req, res) => {
    try {
        const { email } = req.params; // Obtén el email de los parámetros de la ruta

        // Busca el mesero por email
        const mesero = await Mesero.findOne({ email });

        if (!mesero) {
            return res.status(404).json({ message: 'El mesero no existe' });
        }

        // Verifica si el mesero ya está inactivo
        if (!mesero.activo) {
            return res.status(400).json({ message: 'El mesero ya está desactivado' });
        }

        // Cambia el estado de "activo" a false
        mesero.activo = false;
        await mesero.save(); 

        res.json({ message: 'Mesero eliminado correctamente (lógica)' });
    } catch (error) {
        console.error('Error al eliminar el mesero:', error);
        res.status(500).json({ message: 'Error en el servidor al eliminar el mesero' });
    }
};
