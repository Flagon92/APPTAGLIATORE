const express = require('express')
const conectarDB = require('./config/db')
const config = require('./config/global')
const cors = require('cors')

const app = express()

conectarDB()

app.use(cors())
app.use(express.json())

app.use('/api/platillos', require('./routes/platillo'))
app.use('/api/meseros', require('./routes/mesero'))
app.use('/api/categorias', require('./routes/categoria'));  // Rutas de categorías
app.use('/api/clientes', require('./routes/clientes'));  // Rutas clientes


app.listen(config.port, () => {
    console.log(`El servidor está corriendo en el puerto ${config.port}`)
})

