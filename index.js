const express = require('express')
const conectarDB = require('./config/db')
const config = require('./config/global')
const cors = require('cors')

const app = express()

conectarDB()

app.use(cors())
app.use(express.json())

app.use('/api/create-mesero', require('./routes/mesero'))

app.listen(config.port, () => {
    console.log('El servidor esta corriendo por el puerto ' )
})