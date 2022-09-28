require('dotenv').config()
const express = require('express')
const sequalize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 8000;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API for SmartPOS',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express.',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express()
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


app.use(errorHandler)

const start = async () => {
    try {
        await sequalize.authenticate()
        await sequalize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()