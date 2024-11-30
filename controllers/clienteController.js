const Cliente = require('../models/Cliente');

// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
    const { nombre, correo, telefono, dni } = req.body

    try {
        const correoExistente = await Cliente.findOne({ correo })
        if (correoExistente) {
            return res.status(409).json({ msg: 'El correo ya existe' })
        }
        
        const telefonoExistente = await Cliente.findOne({ telefono })
        if (telefonoExistente) {
            return res.status(409).json({ msg: 'El teléfono ya existe' })
        }

        const dniExistente = await Cliente.findOne({ dni })
        if (dniExistente) {
            return res.status(409).json({ msg: 'El dni ya existe' })
        }

        const nuevoCliente = new Cliente( req.body )
        await nuevoCliente.save()

        return res.status(201).json({ msg: 'Cliente creado exitosamente', cliente: nuevoCliente })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Error al crear cliente' })
    }
}

// Obtener todas los clientes
exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find()
        return res.status(200).json(clientes)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Error al obtener los clientes' })
    }
}

// Actualizar un cliente
exports.actualizarCliente = async (req, res) => {

    const { id } = req.params
    const { correo, dni } = req.body

    try {

        const cliente = await Cliente.findById(id)
        if (!cliente) {
            return res.status(409).json({ msg: 'Cliente no encontrado' })
        }

        cliente.correo = correo || cliente.correo
        cliente.dni = dni || cliente.dni

        await cliente.save()

        return res.status(200).json({ msg: 'Cliente actualizado exitosamente', cliente })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: 'Error al actualizar el cliente' })
    }
}

// Eliminar un cliente
exports.eliminarCliente = async (req, res) => {

    try {
        const { id } = req.params;

        // Buscar y eliminar la categoría por su ID
        const cliente = await Cliente.findByIdAndDelete(id);

        if (!cliente) {
            return res.status(409).json({ msg: "Cliente no encontrado" });
        }

        res.json({ msg: "Cliente eliminado exitosamente" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error en el servidor");
    }
};

