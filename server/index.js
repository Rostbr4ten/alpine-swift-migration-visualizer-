const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const birdRouter = require('./routes/bird-router')

const app = express()
const apiPort = 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World! Nice')
})

app.use('/api', birdRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))