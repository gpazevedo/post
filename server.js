const {api} = require('./api')


const PORT =  5000

const server = api.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`)
})
