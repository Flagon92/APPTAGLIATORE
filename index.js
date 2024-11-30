const express = require('express')
const conectarDB = require('./config/db')
const config = require('./config/global')
const cors = require('cors')

const app = express()

conectarDB()

app.use(cors())
app.use(express.json())

app.use('/api/platillos', require('./routes/platillo')) // Rutas platillos
app.use('/api/meseros', require('./routes/mesero')) //Rutas meseros
app.use('/api/categorias', require('./routes/categoria'));  // Rutas de categorías
app.use('/api/clientes', require('./routes/clientes'));  // Rutas clientes
app.use('/api/ordenes', require('./routes/orden')); // Rutas ordenes


app.listen(config.port, () => {
    console.log(`El servidor está corriendo en el puerto ${config.port}`)
})

