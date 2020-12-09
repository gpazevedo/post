const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const morgan = require('morgan')


const { httpAdapter } = require('./httpAdapter')

const api = express()

api.use(express.json());
api.use(express.urlencoded());

// CORS
api.use(cors())

// Set security headers
api.use(helmet())

// Prevents XSS attacks
api.use(xss())

// Prevent http param pollution
api.use(hpp())

// API logger
morgan.token('body', function (req, res) {
    const body = { ...req.body}
    return body
});

morgan.token('host', function (req, res) {
    return req.hostname;
});

morgan.token('status', function (req, res) {
    return res.statusCode;
});

//api.use(morgan(':host :method :url :body :status :response-time'))

// Mount routers
api.post('/', httpAdapter(controller))

async function controller(httpRequest)
{
    await console.log(httpRequest.body)

    return {
        statusCode: 200
    }
}

module.exports = { api }